import { usersRepository } from "../../server";

export type LoginUserDTO = {
  email: string;
  password: string;
};

type ResponseLoginUser = {
  success: boolean;
  message: string;
  id?: string;
};

export class LoginUser {
  execute(data: LoginUserDTO): ResponseLoginUser {
    const searchUser = usersRepository.findUserByCredencials(data);

    if (!searchUser) {
      return {
        success: false,
        message: "O usuário não foi encontrado pelo ID.",
        id: searchUser,
      };
    }

    return {
      success: true,
      message: "Login efetuado com sucesso!",
      id: searchUser,
    };
  }
}
