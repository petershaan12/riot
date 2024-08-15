import nodemailer from "nodemailer";
import { attendTemplate } from "./email/attend";
import handlebars from "handlebars";
import { welcomeTemplate } from "./email/welcome";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  //   try {
  //     const testResult = await transport.verify();
  //     console.log(testResult);
  //   } catch (error) {
  //     console.error(error);
  //     return;
  //   }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.error(error);
  }
}

export function compileAttendTemplate(name: string, url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({ name, url });

  return htmlBody;
}
