import { Anotation } from "../../models";
import { AnotationRepository } from "../../repositories";

type DeleteAnotationRequestDTO = {
  id: string;
};

type DeleteAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class DeleteAnotationUseCase {
  constructor(private anotationRepository: AnotationRepository) {}

  execute(data: DeleteAnotationRequestDTO): DeleteAnotationResponseDTO {
    const { id } = data;

    const anotation = this.anotationRepository.deleteAnotation(id);

    if (!anotation) {
      return {
        message: "Anotação não encontrada para este usuário. Tente novamente!",
        success: false,
      };
    }

    return {
      message: "Anotação deletada com sucesso!",
      success: true,
      anotation,
    };
  }
}
