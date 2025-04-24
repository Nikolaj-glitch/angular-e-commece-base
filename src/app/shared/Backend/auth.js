import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000; //per ora lascio la 3000, poi gestiamo con un file .env
const SECRET_KEY = "secretkey"; //da cambiare con file .env


//per test
const users = [
  { id: 1, name: "admin", password: "123456" },
  { id: 2, name: "user", password: "password" },
];

//per richieste front end
app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  const user = users.find((u) => u.name === name && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenziali non valide" });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: "3h",
  });
  res.json({ token });
});

//aggiunto un end point protetto (esempio)
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Benvenuto, ${req.user.name}` });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token mancante" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token non valido" });
    }
    req.user = decoded;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
