import transporter from "@/lib/nodemailer";
import { sendConfirmationEmailSchema } from "@/validators/sendConfirmationEmail";
import { NextRequest, NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";

export async function GET() {
  return NextResponse.json("Nice get request!");
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  const body = await request.json();

  const confirmationEmailBody = sendConfirmationEmailSchema.safeParse(body);

  if (!confirmationEmailBody.success) {
    return new Response(JSON.stringify({ data: "error" }), { status: 400 });
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
    return new Response(JSON.stringify({ data: "success" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ data: "error" }), { status: 500 });
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
