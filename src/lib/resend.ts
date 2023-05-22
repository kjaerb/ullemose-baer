import { Resend, SendEmailData } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

const options = {
  from: "kjaerb@gmail.com",
  subject: "Tak for din bestilling",
};

interface SendEmailProps {
  to: SendEmailData["to"];
  react: SendEmailData["react"];
}

export const sendEmail = async ({ to, react }: SendEmailProps) => {
  resend.sendEmail({
    ...options,
    to,
    react,
  });
};
