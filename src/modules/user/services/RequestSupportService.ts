import path from 'path';
import AppError from '../../../shared/errors/AppError';
import IMailProvider from '../../../shared/providers/MailProvider/model/IMailProvider';

export default class RequestSupportService {
  private mailProvider: IMailProvider;

  constructor(mailprovider: IMailProvider) {
    this.mailProvider = mailprovider;
  }

  public async execute(
    storeName = '',
    clientName: string,
    storeEmail: string,
    storePhone: string,
    emailBody: string,
  ): Promise<string> {
    const requestResetsTemplate = path.resolve(
      __dirname,
      '..',
      'templates',
      'request_support.hbs',
    );

    await this.mailProvider
      .sendMail({
        to: {
          name: 'Eva Commerce',
          email: 'contato@evacommerce.com.br',
        },
        subject: 'Solicitação de Suporte',
        templateData: {
          variables: {
            storeName,
            clientName,
            storeEmail,
            storePhone,
            emailBody,
          },
          file: requestResetsTemplate,
        },
      })
      .catch(err => {
        throw new AppError(err, 409);
      });

    return 'Solicitação de suport enviada com sucesso';
  }
}
