import { envs } from '@/config/plugins/env.plugin';
import nodemailer from 'nodemailer';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  body: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, body, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: body,
        attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del servidor';
    const body = `
    <h3>Logs de sistema - NOC</h3>
    <p>Elit irure quis aute eiusmod excepteur pariatur consectetur eiusmod qui ipsum quis officia pariatur minim. Nostrud consequat laborum consequat ut dolor veniam ad. Est adipisicing pariatur esse est nulla nulla. Et eiusmod occaecat consectetur veniam ad et fugiat duis eu consectetur irure id minim tempor. Fugiat ea ad consectetur mollit veniam incididunt in.</p>
    <p>Ver logs adjuntos</p>`;

    const attachments: Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-all.log' },
    ];

    return this.sendEmail({
      to,
      subject,
      body,
      attachments,
    });
  }
}
