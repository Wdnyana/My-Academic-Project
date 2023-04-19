import { createTransport } from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const EmailTransport = createTransport(
  sendgridTransport({
    auth: {
      api_key: "WY18L8kiTme-G6BHLklKaQ",
    },
  })
);
