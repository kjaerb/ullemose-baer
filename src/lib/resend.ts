import { Resend, SendEmailData } from "resend";
import { CreateEmailOptions } from "resend/build/src/emails/interfaces";

const { NEXT_PUBLIC_RESEND_API_KEY } = process.env;

const resend = new Resend(NEXT_PUBLIC_RESEND_API_KEY);

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
