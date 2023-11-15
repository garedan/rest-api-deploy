import express, { json } from "express"; // require -> commonJS
import { productsRouter } from "./routes/products.js";
import { corsMiddleware } from "./middlewares/cors.js";
var cors = require("cors");

//import movies from './movies.json' with { type: 'json '}

const app = express();
app.use(json());
app.use(corsMiddleware());
app.use(cors());
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// Todos los recursos que sean MOVIES se identifica con /movies
app.use("/products", productsRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
