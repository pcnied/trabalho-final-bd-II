import { Anotation } from "../../models";
import { AnotationRepository, UsersRepository } from "../../repositories";

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

    const userRepository = new UsersRepository();
    const userExists = await userRepository.getById(data.userId);

    if (!userExists) {
      return {
        success: false,
        message: "Usuário não encontrado. A anotação não pode ser criada.",
      };
    }

    const anotationRepository = new AnotationRepository();
    const newAnotation = new Anotation(userId, title, description, new Date());
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
