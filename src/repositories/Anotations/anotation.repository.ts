import { pgHelper } from "../../database";
import { AnotationEntity } from "../../database/entities/anotation.entity";
import { Anotation, User } from "../../models";

export class AnotationRepository {
  public async createAnotation(anotation: Anotation): Promise<Anotation> {
    const { userId, title, description, createdAt } = anotation;
    const manager = pgHelper.client.manager;

    const newAnotation = manager.create(AnotationEntity, {
      userId,
      title,
      description,
      createdAt
    })

    const anotationCreated = await manager.save(newAnotation)

    return anotationCreated;
  }

  deleteAnotation(id: string): Anotation | undefined {
    const index = databaseAnotations.findIndex((a) => a.id === id);
    if (index === -1) {
      return undefined;
    }
    console.log(databaseAnotations[index]);

    const anotationDeleted = databaseAnotations[index];
    databaseAnotations.splice(index, 1);
    return anotationDeleted;
  }

  updateAnotation(
    id: string,
    item: {
      title: string;
      description: string;
      date: string;
      archived: boolean;
    }
  ): Anotation | undefined {
    const index = databaseAnotations.findIndex((a) => a.id === id);

    if (index === -1) {
      return undefined;
    }

    databaseAnotations[index].title = item.title;
    databaseAnotations[index].description = item.description;
    databaseAnotations[index].date = item.date;
    databaseAnotations[index].archived = item.archived;

    return databaseAnotations[index];
  }

  public async getAllAnotations(userId: string): Promise<Anotation[]> {
    const manager = pgHelper.client.manager;
    const listAnotations = await manager.find(AnotationEntity, {
      where: {
        userId
      }
    })

    return listAnotations.map((row) => );
  }

  getAnotation(id: string): Anotation | undefined {
    const anotation = databaseAnotations.find((a) => a.id === id);

    if (!anotation) {
      return undefined;
    }

    return anotation;
  }

  private entityToModel(dataDB: AnotationEntity): Anotation {
    const user = new User(dataDB.user.id, dataDB.user.name, dataDB.user.email, dataDB.user.password)

    const anotation = new Anotation(dataDB.id, dataDB.title, dataDB.description, dataDB.createdAt)

    return anotation;
  }
}
