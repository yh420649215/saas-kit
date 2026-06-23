import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "re_xxx") return null; // not configured
  return new Resend(key);
}

export async function sendWelcomeEmail(to: string) {
  const resend = getResend();
  if (!resend) return; // silently skip if not configured

  await resend.emails.send({
    from: process.env.NEXT_PUBLIC_APP_NAME
      ? `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").hostname}>`
      : "SaaS Kit <noreply@saaskit.dev>",
    to,
    subject: "Welcome to SaaS Kit!",
    html: `<h1>Welcome!</h1><p>Thanks for signing up. Your account is ready.</p>`,
  });
}
