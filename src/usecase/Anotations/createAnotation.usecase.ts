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
  anotation: Anotation;
};

export class CreateAnotationUseCase {
  public async execute(
    data: CreateAnotationRequestDTO
  ): Promise<CreateAnotationResponseDTO> {
    const { userId, title, description } = data;

    const anotationRepository = new AnotationRepository();

    const anotation = await anotationRepository.createAnotation({
      userId,
      title,
      description,
    });

    return {
      message: "Anotação criada com sucesso!",
      success: true,
      anotation,
    };
  }
}
