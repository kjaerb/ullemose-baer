import { defaultEmailConfig, resend } from "@/lib/resend";
import { sendDeliveryEmail } from "@/validators/sendDeliveryEmail";

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


    const {data, error} = await resend.emails.send({
          ...defaultEmailConfig,
          to,
          subject: "Afhentning af bær",
          html,
        })
    
        if (error) {
      console.log(error);
      return new Response(JSON.stringify({ data: "error" }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }))
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
