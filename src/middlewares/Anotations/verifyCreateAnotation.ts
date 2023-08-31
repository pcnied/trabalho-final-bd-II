import { NextFunction, Request, Response } from "express";

export function verifyCreateAnotation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, date } = req.body;

  if (!title || !description || !date) {
    return res.status(400).json({
      message:
        "Todos os campos precisam estar preenchidos para a criação de uma anotação.",
      success: false,
    });
  }

  if (!title) {
    return res.status(400).json({
      message: "A propriedade título não foi preenchida. Tente novamente.",
      success: false,
    });
  }

  if (!description) {
    return res.status(400).json({
      message: "A propriedade descrição não foi preenchida. Tente novamente.",
      success: false,
    });
  }

  if (!date) {
    return res.status(400).json({
      message: "A propriedade data não foi preenchida. Tente novamente.",
      success: false,
    });
  }
  next();
}
