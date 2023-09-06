import { UserJSON } from "../../models";
import { UsersRepository } from "../../repositories";

export type LoginUserDTO = {
  email: string;
  password: string;
};

type ResponseLoginUser = {
  success: boolean;
  message: string;
  id?: UserJSON;
};

export class LoginUser {
  public async execute(data: LoginUserDTO): Promise<ResponseLoginUser> {
    const repository = new UsersRepository();

    const searchUser = await repository.findUserByCredencials(data);

    if (!searchUser) {
      return {
        success: false,
        message: "Não foi possível realizar o Login com os dados informados.",
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
