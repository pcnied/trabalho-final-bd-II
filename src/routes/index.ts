import express, { Request, Response } from "express";
import {
  CreateAnotationController,
  DeleteAnotationController,
  GetAllAnotationsController,
  GetAnotationController,
  UpdateAnotationController,
  UserController,
} from "../controllers";
import {
  validateDataUser,
  validateLoginUser,
  verifyCreateAnotation,
  verifyUpdateAnotation,
  verifyUserExist,
} from "../middlewares";
import { AnotationRepository, UsersRepository } from "../repositories";

export const anotationRepository = new AnotationRepository();
export const usersRepository = new UsersRepository();

const app = express.Router();
app.get("/", (request: Request, response: Response) =>
  response.status(200).json({ message: "Rodando!" })
);

// ROTA DE CRIAÇÃO DE USUÁRIO
app.post("/users/signup", validateDataUser, UserController.create);

// ROTA DE LOGIN DE USUÁRIO
app.post("/users/signin", validateLoginUser, UserController.login);

// ROTA DE CRIAÇÃO DE ANOTAÇÃO
app.post(
  "/users/:userId/anotation",
  verifyCreateAnotation,
  verifyUserExist,
  CreateAnotationController.execute
);

// ROTA PARA LISTAR TODAS AS ANOTAÇÕES
app.get(
  "/users/:userId/anotation",
  verifyUserExist,
  GetAllAnotationsController.execute
);

// ROTA PARA LISTAR ANOTAÇÃO ESPECÍFICA
app.get(
  "/users/:userId/anotation/:id",
  verifyUserExist,
  GetAnotationController.execute
);

// ROTA PARA DELETAR ANOTAÇÃO
app.delete(
  "/users/:userId/anotation/:id",
  verifyUserExist,
  DeleteAnotationController.execute
);

// ROTA PARA ATUALIZAÇÃO ANOTAÇÃO
app.put(
  "/users/:userId/anotation/:id",
  verifyUserExist,
  verifyUpdateAnotation,
  UpdateAnotationController.execute
);

export default app;
