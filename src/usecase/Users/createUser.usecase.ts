import { usersRepository } from "../../server";

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
  execute(data: UserDTO): ResponseCreate {
    const usersExists = usersRepository
      .listUsers()
      .some((user) => user.email === data.email);

    if (usersExists) {
      return {
        message: "Não foi possível criar uma conta. Tente novamente!",
        success: false,
      };
    }

    const userCreated = usersRepository.createUser(data);

    return {
      message: "Conta criada com sucesso!",
      success: true,
      data: userCreated,
    };
  }
}
