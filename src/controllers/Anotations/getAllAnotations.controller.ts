import { Request, Response } from "express";
import { anotationRepository } from "../../routes/index";
import { GetAllAnotationsUseCase } from "../../usecase";

export class GetAllAnotationsController {
  public static execute(req: Request, res: Response) {
    const { userId } = req.params;
    let { archived } = req.query;
    const { title } = req.query;

    const getAllAnotationsUseCase = new GetAllAnotationsUseCase(
      anotationRepository
    );

    const response = getAllAnotationsUseCase.execute(
      userId,
      archived !== undefined ? JSON.parse(archived as string) : undefined,
      title ? String(title) : undefined
    );

    return res.status(200).json(response);
  }
}
