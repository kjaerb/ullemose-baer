import { ConfirmationEmail } from "@/validators/sendConfirmationEmail";
import axios from "axios";

interface SendEmailProps {
  to: string;
  html: string;
}

export async function useSendEmail({ to, html }: SendEmailProps) {
  const confirmationEmailDetails: ConfirmationEmail = {
    to,
    html,
  };

  const response = await axios.post(
    "/api/sendConfirmationEmail",
    confirmationEmailDetails
  );

  return response;
}
