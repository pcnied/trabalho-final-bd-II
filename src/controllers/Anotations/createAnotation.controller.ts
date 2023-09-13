import { Request, Response } from "express";
import { CreateAnotationUseCase } from "../../usecase";

export class CreateAnotationController {
  public static async execute(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      const createAnotationUseCase = new CreateAnotationUseCase();

      const response = createAnotationUseCase.execute({
        userId,
        title,
        description,
      });

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
