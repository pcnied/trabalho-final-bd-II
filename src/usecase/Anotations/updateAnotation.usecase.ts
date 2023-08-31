import { Anotation } from "../../models";
import { AnotationRepository } from "../../repositories";

export type UpdateAnotationRequestDTO = {
  title: string;
  description: string;
  date: string;
  archived?: boolean;
};

export type UpdateAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation | undefined;
};

export class UpdateAnotationUseCase {
  constructor(private anotationRepository: AnotationRepository) {}

  execute(
    id: string,
    data: UpdateAnotationRequestDTO
  ): UpdateAnotationResponseDTO {
    const { title, description, date, archived } = data;

    const anotation = this.anotationRepository.getAnotation(id);

    if (!anotation) {
      return {
        message: "Não foi possível atualizar a anotação. Tente novamente!",
        success: false,
      };
    }

    const anotationUpdated = this.anotationRepository.updateAnotation(id, {
      title: title || anotation.title,
      description: description || anotation.description,
      date: date || anotation.date,
      archived: archived !== undefined ? archived : anotation.archived,
    });

    return {
      message: "Anotação atualizada com sucesso!",
      success: true,
      anotation: anotationUpdated,
    };
  }
}
