import { pgHelper } from "../../database";
import { UserJSON } from "../../models";
import { UserDTO } from "../../usecase";
import { LoginUserDTO } from "../../usecase/Users/loginUser.usecase";

export class UsersRepository {
  public async createUser(data: UserDTO): Promise<UserJSON> {
    const { name, email, password } = data;
    await pgHelper.client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );
    const userSelect = await pgHelper.client.query(
      "SELECT * FROM users ORDER BY created_at DESC LIMIT 1"
    );

    const [lastUser] = userSelect;

    return {
      id: lastUser.id,
      name: lastUser.name,
      email: lastUser.email,
      password: lastUser.password,
    };
  }

  // listUsers() {
  //   const users: User[] = databaseUsers;

  //   return users.map((user) => user.toJSON());
  // }

  public async findUserByCredencials(
    data: LoginUserDTO
  ): Promise<UserJSON | undefined> {
    const { email, password } = data;
    const response = await pgHelper.client.query(
      "SELECT * FROM users where (email, password) = ($1, $2)",
      [email, password]
    );

    if (!response.length) return undefined;

    const [userLogin] = response;

    return {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
      password: userLogin.password,
    };
  }

  public async getById(userId: string): Promise<UserJSON | undefined> {
    const response = await pgHelper.client.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (!response.length) return undefined;

    return {
      id: response[0].id,
      name: response[0].name,
      email: response[0].email,
      password: response[0].password,
    };
  }

  public async getByEmail(email: string): Promise<boolean> {
    const user = await pgHelper.client.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    return user.length !== 0;
  }
}
