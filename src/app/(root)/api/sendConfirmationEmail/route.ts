import { defaultEmailConfig, resend } from "@/lib/resend";
import { sendConfirmationEmailSchema } from "@/validators/sendConfirmationEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const confirmationEmailBody = sendConfirmationEmailSchema.safeParse(body);

    if (!confirmationEmailBody.success) {
      return new Response(JSON.stringify({ data: "error" }), { status: 400 });
    }

    const { to, html } = confirmationEmailBody.data;

    const {data, error} = await resend.emails.send({
      ...defaultEmailConfig,
      to,
      subject: "Tak for din bestilling",
      html,
    })

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data)
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
