import { NextFunction, Request, Response } from "express";

export function verifyUpdateAnotation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, date, archived } = req.body;

  if (!title && !description && !date && archived === undefined) {
    return res.status(400).json({
      message: "É necessário editar pelo menos uma das propriedades.",
      success: false,
    });
  }

  next();
}
