import { Anotation, UserJSON } from "../../models";
import { AnotationRepository, UsersRepository } from "../../repositories";

export type CreateAnotationRequestDTO = {
  userId: string;
  title: string;
  description: string;
  date: string;
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
    const { userId, title, description, date } = data;

    const userRepository = new UsersRepository();
    const userExists = await userRepository.getById(data.userId);

    if (!userExists) {
      return {
        success: false,
        message: "Usuário não encontrado. A anotação não pode ser criada.",
      };
    }

    const anotationRepository = new AnotationRepository();
    const newAnotation = await anotationRepository.createAnotation({
      userId,
      title,
      description,
      date,
    })

    return {
      message: "Anotação criada com sucesso!",
      success: true,
      anotation,
    };
  }
}
