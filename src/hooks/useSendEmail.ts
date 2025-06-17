import { ConfirmationEmail } from "@/validators/sendConfirmationEmail";
import axios from "axios";

type EmailApiEndpoints = "/api/sendConfirmationEmail" | "/api/sendDeliveryEmail";

interface SendEmailProps {
  api: EmailApiEndpoints;
  to: string;
  html: string;
}

export async function useSendEmail({ api, to, html }: SendEmailProps) {
  const confirmationEmailDetails: ConfirmationEmail = {
    to,
    html,
  };

  const response = await axios.post(api, confirmationEmailDetails);

  return response;
}
