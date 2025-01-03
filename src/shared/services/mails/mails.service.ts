import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';

dotenv.config();

@Injectable()
export class MailsService {
  private readonly transporter: nodemailer.Transporter;
  private readonly companyData: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    handlebars.registerHelper('formatDate', (date: string) => {
      return new Date(date).toLocaleDateString();
    });

    handlebars.registerHelper('formatCurrency', (value: number) => {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    });

    this.companyData = {
      companyName: process.env.COMPANY_NAME,
      companyAddress: process.env.COMPANY_ADDRESS,
      companyPhone: process.env.COMPANY_PHONE,
      companyEmail: process.env.COMPANY_EMAIL,
    };

    const hbsOptions = {
      viewEngine: {
        extname: '.hbs',
        partialsDir: 'src/core/templates/partials/',
        layoutsDir: 'src/core/templates/layouts/',
        defaultLayout: 'main',
      },
      viewPath: 'src/core/templates/mails/',
      extName: '.hbs',
    };

    this.transporter.use('compile', hbs(hbsOptions));
  }

  public async send(templateName: string, subject: string, data: any): Promise<void> {
    await this.transporter.sendMail({
      to: data.email,
      from: process.env.MAIL_FROM,
      subject: subject,
      template: templateName,
      context: { ...data, ...this.companyData },
      attachments: [
        {
          filename: 'logotipo-largo.png',
          path: 'src/assets/images/logotipo-largo.png',
          cid: 'companyLogo',
        },
      ],
    } as any);
  }
}
