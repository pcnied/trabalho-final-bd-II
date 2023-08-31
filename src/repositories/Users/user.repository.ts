import { User } from "../../models";
import { UserDTO } from "../../usecase";
import { LoginUserDTO } from "../../usecase/Users/loginUser.usecase";

export class UsersRepository {
  createUser(dados: UserDTO) {
    const user = new User(dados.name, dados.email, dados.password);

    databaseUsers.push(user);

    return user.toJSON();
  }

  listUsers() {
    const users: User[] = databaseUsers;

    return users.map((user) => user.toJSON());
  }

  findUserByCredencials(data: LoginUserDTO) {
    const user = databaseUsers.find(
      (i) =>
        i.toJSON().email === data.email && i.toJSON().password === data.password
    );
    console.log(user);
    if (!user) return;

    return user.toJSON().id;
  }

  getById(id: string) {
    return databaseUsers.find((item) => item.toJSON().id === id);
  }
}
