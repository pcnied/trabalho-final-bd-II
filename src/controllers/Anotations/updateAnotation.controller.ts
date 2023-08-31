import { Request, Response } from "express";
import { anotationRepository } from "../../routes/index";
import {
  UpdateAnotationRequestDTO,
  UpdateAnotationUseCase,
} from "../../usecase";

export class UpdateAnotationController {
  public static execute(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data: UpdateAnotationRequestDTO = req.body;

      const updateAnotationUseCase = new UpdateAnotationUseCase(
        anotationRepository
      );
      const response = updateAnotationUseCase.execute(id, data);

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
