import { Request, Response } from "express";
import { CreateUser, LoginUser } from "../../usecase";

export class UserController {
  public static create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const usecase = new CreateUser();

    const response = usecase.execute({ name, email, password });

    if (!response.success) {
      return res.status(400).json(response);
    }

    return res.status(201).json(response);
  }

  public static login(req: Request, res: Response) {
    const { email, password } = req.body;

    const usecase = new LoginUser();

    const response = usecase.execute({ email, password });

    if (!response.success) {
      return res.status(400).json(response);
    }

    return res.status(202).json(response);
  }
}
