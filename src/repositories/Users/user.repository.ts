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

    const [lastUser] = userSelect.rows;

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
    const user = await pgHelper.client.query(
      "SELECT * FROM users where (email, password) = ($1, $2)",
      [email, password]
    );

    if (!user.rowCount) return undefined;

    return {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      password: user.rows[0].password,
    };
  }

  public async getById(id: string): Promise<UserJSON | undefined> {
    const user = await pgHelper.client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (!user.rowCount) return undefined;

    return {
      id: user.rows[0].id,
      name: user.rows[0].name,
      email: user.rows[0].email,
      password: user.rows[0].password,
    };
  }

  public async getByEmail(email: string): Promise<boolean> {
    const user = await pgHelper.client.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    return user.length !== 0;
  }
}
