import cors from "cors";
import "dotenv/config";
import express from "express";
import routesApp from "./routes/index";
import { pgHelper } from "./database";

const app = express();

app.use(express.json());
app.use(cors());
// Adiciona cabeçalhos HTTP que informam aos navegadores para permitir que
// uma aplicação Web seja executada em uma origem e acesse recursos de outra origem diferente
app.use(express.urlencoded({ extended: false }));
// Converte caracteres especiais nas URL's

app.use(routesApp);

pgHelper
  .connect()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log("Servidor iniciado", process.env.PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });
