import { Anotation } from "../../models";
import { AnotationRepository } from "../../repositories";

export type GetAllAnotationsResponseDTO = {
  message: string;
  success: boolean;
  anotations: Anotation[];
};

export class GetAllAnotationsUseCase {
  constructor(private anotationRepository: AnotationRepository) {}

  execute(
    userId: string,
    archived: boolean,
    title?: string
  ): GetAllAnotationsResponseDTO {
    const anotations = this.anotationRepository.getAllAnotations(
      userId,
      archived,
      title
    );

    return {
      message:
        anotations.length > 0
          ? "Anotações encontradas com sucesso!"
          : "Nenhuma anotação encontrada!",
      success: true,
      anotations,
    };
  }
}
