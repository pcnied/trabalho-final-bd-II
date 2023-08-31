import { Request, Response } from "express";
import { anotationRepository } from "../../routes/index";
import { DeleteAnotationUseCase } from "../../usecase";

export class DeleteAnotationController {
  public static execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteAnotationUseCase = new DeleteAnotationUseCase(
        anotationRepository
      );

      const response = deleteAnotationUseCase.execute({
        id,
      });
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
