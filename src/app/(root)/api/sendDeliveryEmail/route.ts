import transporter from "@/lib/nodemailer";
import { sendDeliveryEmail } from "@/validators/sendDeliveryEmail";
import { NextRequest, NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const sendDeliveryEmailBody = sendDeliveryEmail.safeParse(body);

    if (!sendDeliveryEmailBody.success) {
      return new Response(JSON.stringify({ data: "error, no email or html" }), {
        status: 400,
      });
    }

    const { to, html } = sendDeliveryEmailBody.data;

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
          return new Response(
            JSON.stringify({
              message: "internal server error, transporter not ready",
              data: JSON.stringify(error),
            })
          );
        } else {
          resolve(success);
        }
      });
    });

    const mailOptions: Mail.Options = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to,
      subject: "Afhentning af bær",
      html,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });

    transporter.close();

    return new Response(JSON.stringify({ data: to }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "internal server error: " + error,
        data: JSON.stringify(error),
      }),
      {
        status: 500,
      }
    );
  }
}
