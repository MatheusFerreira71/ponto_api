export default interface ICreateUserDTO {
  name: string;
  email: string;
  password?: string;
  first_access?: boolean;
  email_checked?: boolean;
}
