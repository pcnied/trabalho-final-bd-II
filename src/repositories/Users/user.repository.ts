import { pgHelper } from "../../database";
import { UserEntity } from "../../database/entities/user.entity";
import { User, UserJSON } from "../../models";
import { RequestCreateDTO } from "../../usecase";
import { LoginUserDTO } from "../../usecase/Users/loginUser.usecase";

export class UsersRepository {
  public async createUser(data: RequestCreateDTO): Promise<UserJSON> {
    const { name, email, password } = data;

    const manager = pgHelper.client.manager;
    const newUser = manager.create(UserEntity, { name, email, password });
    const userCreated = await manager.save(newUser);

    return userCreated;
  }

  public async listUsers(email: string) {
    const manager = pgHelper.client.manager;
    const userFound = await manager.find(UserEntity, {
      where: {
        email,
      },
    });
  }

  public async findUserByCredencials(
    data: LoginUserDTO
  ): Promise<UserJSON | undefined> {
    const { email, password } = data;
    const manager = pgHelper.client.manager;
    const userFound = await manager.findOneBy(UserEntity, {
      email,
      password,
    });

    if (!userFound) return undefined;

    return userFound;
  }

  public async getById(userId: string): Promise<User | undefined> {
    const manager = pgHelper.client.manager;
    const userFound = await manager.findOneBy(UserEntity, { id: userId });

    if (!userFound) return undefined;

    return this.entityToModel(userFound);
  }

  public async getByEmail(email: string): Promise<boolean> {
    const manager = pgHelper.client.manager;
    const userFound = await manager.findOneBy(UserEntity, { email });

    return !!userFound;
  }

  private entityToModel(dataDB: UserEntity): User {
    return new User(dataDB.id, dataDB.name, dataDB.email, dataDB.password);
  }
}
