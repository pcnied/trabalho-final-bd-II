import { Database } from "../../database";
import { Anotation } from "../../models";

export class AnotationRepository {
  public async createAnotation(
    anotation: Anotation
  ): Promise<Anotation | undefined> {
    const { userId, title, description, date } = anotation;

    await Database.query(
      "INSERT INTO anotations (user_id, title, description, date) VALUES ($1, $2, $3, $4)",
      [userId, title, description, date]
    );

    const anotationSelected = await Database.query(
      "SELECT a.user_id, a.id, a.title, a.description, a.date, a.archived, a.created_at, u.email FROM anotations a INNER JOIN users u ON u.id = a.user_id ORDER BY a.created_at DESC LIMIT 1",
      [userId, title, description, date]
    );

    const [lastAnotation] = anotationSelected.rows;

    return new Anotation {
      userId: lastAnotation.user_id,
      title: lastAnotation.title,
      description: lastAnotation.description,
      date: lastAnotation.date
    };
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

  getAllAnotations(
    userId: string,
    archived: boolean,
    title?: string
  ): Anotation[] {
    let anotations = databaseAnotations.filter((a) => a.userId === userId);
    if (archived !== undefined) {
      anotations = anotations.filter((a) => a.archived === archived);
    }

    if (title) {
      anotations = anotations.filter((a) => a.title.includes(title));
    }

    return anotations;
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
