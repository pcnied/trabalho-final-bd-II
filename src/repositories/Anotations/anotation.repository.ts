import { databaseAnotations } from "../../database";
import { Anotation } from "../../models";

export class AnotationRepository {
  createAnotation(anotation: Anotation): Anotation {
    databaseAnotations.push(anotation);
    return anotation;
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
