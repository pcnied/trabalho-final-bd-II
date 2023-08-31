import { Anotation } from "../../models";
import { AnotationRepository } from "../../repositories";

type GetAnotationRequestDTO = {
  id: string;
};

type GetAnotationResponseDTO = {
  message: string;
  success: boolean;
  anotation?: Anotation;
};

export class GetAnotationUseCase {
  constructor(private anotationRepository: AnotationRepository) {}

  execute(data: GetAnotationRequestDTO): GetAnotationResponseDTO {
    const { id } = data;

    const anotation = this.anotationRepository.getAnotation(id);

    if (!anotation) {
      return {
        message: "Não foi possível encontrar a anotação. Tente novamente!",
        success: false,
      };
    }

    return {
      message: "Anotação encontrada com sucesso!",
      success: true,
      anotation,
    };
  }
}
