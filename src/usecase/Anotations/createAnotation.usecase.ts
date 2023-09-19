import { pgHelper } from "../../database";
import { AnotationEntity } from "../../database/entities/anotation.entity";
import { Anotation } from "../../models";
import { AnotationRepository } from "../../repositories";

export type CreateAnotationRequestDTO = {
  userId: string;
  title: string;
  description: string;
};

export type CreateAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class CreateAnotationUseCase {
  public async execute(
    data: CreateAnotationRequestDTO
  ): Promise<CreateAnotationResponseDTO> {
    const { userId, title, description } = data;

    const anotationRepository = new AnotationRepository();

    const newAnotation = pgHelper.client.manager.create(AnotationEntity, {
      userId,
      title,
      description,
    });
    const responseNewAnotation = await anotationRepository.createAnotation(
      newAnotation
    );

    return {
      message: "Anotação criada com sucesso!",
      success: true,
      anotation: responseNewAnotation,
    };
  }
}
