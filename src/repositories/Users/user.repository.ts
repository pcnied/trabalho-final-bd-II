import { Database } from "../../database";
import { UserJSON } from "../../models";
import { UserDTO } from "../../usecase";
import { LoginUserDTO } from "../../usecase/Users/loginUser.usecase";

export class UsersRepository {
  public async createUser(data: UserDTO): Promise<UserJSON> {
    const { name, email, password } = data;
    await Database.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );
    const userSelect = await Database.query(
      "SELECT * FROM users ORDER BY created_at DESC LIMIT 1"
    );

    const [lastInserted] = userSelect.rows;

    return {
      id: lastInserted.id,
      name: lastInserted.name,
      email: lastInserted.email,
      password: lastInserted.password,
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
    const user = await Database.query(
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
    const user = await Database.query("SELECT * FROM users where id = $1", [
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
    const user = await Database.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    return !!user.rowCount;
  }
}
