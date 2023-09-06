import { UsersRepository } from "../../repositories";

export type UserDTO = {
  name: string;
  email: string;
  password: string;
};

type ResponseCreate = {
  success: boolean;
  message: string;
  data?: UserDTO & { id: string };
};

export class CreateUser {
  public async execute(data: UserDTO): Promise<ResponseCreate> {
    const repository = new UsersRepository();

    const userExists = await repository.getByEmail(data.email);

    if (userExists) {
      return {
        message:
          "Não foi possível criar uma conta com o e-mail inserido. Tente novamente!",
        success: false,
      };
    }

    const userCreated = await repository.createUser(data);

    return {
      message: "Conta criada com sucesso!",
      success: true,
      data: userCreated,
    };
  }
}
