import nodemailer, { Transporter } from 'nodemailer';

import emailConfig from '../../../../config/Email';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../model/IMailProvider';

export default class MailerProvider implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;

    const transporter = nodemailer.createTransport(emailConfig);

    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
    pdfFile,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Eva System',
        address: from?.email || 'noreply@evacommerce.com.br',
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
      attachments: pdfFile,
    });
  }
}
