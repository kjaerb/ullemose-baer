import transporter from "@/lib/nodemailer";
import { sendConfirmationEmailSchema } from "@/validators/sendConfirmationEmail";
import { NextRequest, NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";

export async function GET() {
  return NextResponse.json("Nice get request!");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const confirmationEmailBody = sendConfirmationEmailSchema.safeParse(body);

    if (!confirmationEmailBody.success) {
      return new Response(JSON.stringify({ data: "error" }), { status: 400 });
    }

    const { to, html } = confirmationEmailBody.data;

    if (process.env.NODE_ENV === "production") {
      const mailOptions: Mail.Options = {
        from: process.env.NEXT_PUBLIC_EMAIL,
        to,
        subject: "Tak for din bestilling",
        html,
      };

      await transporter.sendMail(mailOptions);
    }

    return new Response(JSON.stringify({ data: "success" }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "internal server error",
        data: JSON.stringify(error),
      }),
      {
        status: 500,
      }
    );
  }
}
