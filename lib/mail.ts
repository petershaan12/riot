import nodemailer from "nodemailer";
import { attendTemplate } from "./email/attend";
import handlebars from "handlebars";
import { deleteTemplate } from "./email/delete";

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

export function compileAttendTemplate(
  name: string,
  judul: string,
  tautan: string,
  ticketId: string
) {
  const baseUrlEvent = "http://localhost:3000/events/";
  const baseUrlTicket = "http://localhost:3000/ticket/";
  const fullTautan = `${baseUrlEvent}${tautan}`;
  const fullTicketId = `${baseUrlTicket}${ticketId}`;
  const template = handlebars.compile(attendTemplate);

  const htmlBody = template({
    name,
    judul,
    tautan: fullTautan,
    ticketId: fullTicketId,
  });

  return htmlBody;
}

export function deleteAttentTemplate(name: string, judul: string) {
  const template = handlebars.compile(deleteTemplate);
  const htmlBody = template({ name, judul });

  return htmlBody;
}

