export default interface IUpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  email_checked?: boolean;
  forgotten_token?: string;
  first_access?: boolean;
}
