const pass = process.env.SMPT_PASSWORD;
const user = process.env.SMPT_USER;

const emailConfig = {
  name: 'www.evacommerce.com.br',
  host: 'mail.evacommerce.com.br',
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
};

export default emailConfig;
