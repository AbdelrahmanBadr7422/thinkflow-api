export interface IRegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface ILoginDTO {
  email?: string;
  username?: string;
  password: string;
}
