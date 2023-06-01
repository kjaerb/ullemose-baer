import transporter from "@/lib/nodemailer";
import { sendConfirmationEmailSchema } from "@/validators/sendConfirmationEmail";
import { NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json();

  const confirmationEmailBody = sendConfirmationEmailSchema.safeParse(body);

  if (!confirmationEmailBody.success) {
    return NextResponse.json({ data: "error" }, { status: 400 });
  }

  const { to, html } = confirmationEmailBody.data;

  const mailOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to,
    subject: "Tak for din bestilling",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ data: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: "error" }, { status: 500 });
  }
}
