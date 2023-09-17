import { pgHelper } from "../../database";
import { AnotationEntity } from "../../database/entities/anotation.entity";
import { Anotation } from "../../models";

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

    return 
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

  public async getAllAnotations(userId: string): Promise<Anotation[]> {
    const anotations = await pgHelper.client.query(
      "SELECT a.id as anotation_id, a.title, a.description, a.created_at, u.id as user_id, u.email FROM anotations a INNER JOIN users u ON a.user_id = u.id WHERE user_id = $1",
      [userId]
    );

    const listAnotations: Anotation[] = anotations.map((v: any) => {
      return {
        userId: v.user_id,
        id: v.anotation_id,
        title: v.title,
        description: v.description,
        created_at: v.createdAt,
        archived: v.archived,
      };
    });

    return listAnotations;
  }

  getAnotation(id: string): Anotation | undefined {
    const anotation = databaseAnotations.find((a) => a.id === id);

    if (!anotation) {
      return undefined;
    }

    return anotation;
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

  private entityToModel(dataDB: AnotationEntity): Anotation {
    return new User(dataDB.id, dataDB.name, dataDB.email, dataDB.password);
  }
}
