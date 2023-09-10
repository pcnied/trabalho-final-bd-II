import { pgHelper } from "../../database";
import { Anotation } from "../../models";

export class AnotationRepository {
  public async createAnotation(
    anotation: Anotation
  ): Promise<Anotation> {
    const { userId, title, description, date } = anotation;

    await pgHelper.client.query(
      "INSERT INTO anotations (user_id, title, description, date) VALUES ($1, $2, $3, $4)",
      [userId, title, description, date]
    );

    const anotationSelected = await pgHelper.client.query(
      "SELECT a.user_id, a.id, a.title, a.description, a.date, a.archived, a.created_at, u.email FROM anotations a INNER JOIN users u ON u.id = a.user_id ORDER BY a.created_at DESC LIMIT 1",
      [userId, title, description, date]
    );

    const [lastAnotation] = anotationSelected;

    return new Anotation(userId, title, description, date);
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

  public async getAllAnotations(
    userId: string,
    archived: boolean,
    title?: string
  ): Anotation[] {
    const response = await pgHelper.client.query('SELECT * FROM anotations WHERE user_id = $1', [userId])

    if (!response.length) return undefined;

    const listAnotations = response.find((a) => a.)
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
}
