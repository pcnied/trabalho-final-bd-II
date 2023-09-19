import { FindOptionsWhere } from "typeorm";
import { pgHelper } from "../../database";
import { AnotationEntity } from "../../database/entities/anotation.entity";
import { Anotation } from "../../models";

type CreateRequestDTO = {
  userId: string;
  title: string;
  description: string;
  createdAt: Date;
};

type UpdateRequestDTO = {
  anotationId: string;
  title?: string;
  description?: string;
  archived?: boolean;
};

type GetAllAnotationsDTO = {
  userId: string;
  title?: string;
  archived?: boolean;
};

export class AnotationRepository {
  public async createAnotation(data: CreateRequestDTO): Promise<Anotation> {
    const { userId, title, description } = data;
    const manager = pgHelper.client.manager;

    const newAnotation = manager.create(AnotationEntity, {
      userId,
      title,
      description,
    });

    const anotationCreated = await manager.save(newAnotation);

    return this.entityToModel(anotationCreated);
  }

  public async deleteAnotation(anotationId: string): Promise<void> {
    const manager = pgHelper.client.manager;
    await manager.delete(AnotationEntity, {
      where: {
        id: anotationId,
      },
    });
  }

  public async updateAnotation(
    data: UpdateRequestDTO
  ): Promise<Anotation | null> {
    const { anotationId, title, description, archived } = data;
    const manager = pgHelper.client.manager;

    await manager.update(
      AnotationEntity,
      { id: anotationId },
      { title, description, archived }
    );

    const anotationFound = await manager.findOne(AnotationEntity, {
      where: {
        id: anotationId,
      },
    });

    return anotationFound ? this.entityToModel(anotationFound) : null;
  }

  public async getAllAnotations({
    userId,
    title,
    archived,
  }: GetAllAnotationsDTO): Promise<Anotation[]> {
    const manager = pgHelper.client.manager;
    const filters: FindOptionsWhere<AnotationEntity> = { userId };

    if (title) {
      filters.title = title;
    }

    if (archived != undefined) {
      filters.archived = archived;
    }

    const listAnotations = await manager.find(AnotationEntity, {
      where: filters,
    });

    return listAnotations.map((row) => this.entityToModel(row));
  }

  async getAnotationById(idAnotation: string): Promise<Anotation | null> {
    const manager = pgHelper.client.manager;
    const anotationFound = await manager.findOne(AnotationEntity, {
      where: {
        id: idAnotation,
      },
    });

    return anotationFound ? this.entityToModel(anotationFound) : null;
  }

  private entityToModel(dataDB: AnotationEntity): Anotation {
    const anotation = new Anotation(
      dataDB.userId,
      dataDB.id,
      dataDB.title,
      dataDB.description,
      dataDB.createdAt,
      dataDB.archived
    );

    return anotation;
  }
}
