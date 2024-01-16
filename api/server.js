import express from "express";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

//ROUTES
import accountRoutes from "./routes/accountRoutes.js";
import editAccountRoutes from "./routes/editAccountRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

//Prisma Client
import prisma from "./constats/config.js";

const app = express();
const port = process.env.SERVER_PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//SERVER CLIENT FOLDER IE REACT BUILD
app.use(express.static(path.join(__dirname, "clientBuild")));

//CORS
//ADD YOUR URL HERE
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:5001",
      "http://localhost:5173",
    ],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

//SESSIONS
app.use(
  expressSession({
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api", accountRoutes);
app.use("/api", editAccountRoutes);
app.use("/api", taskRoutes);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(port, () => {
  console.log(`SERVER STARTED : ${port}`);
});
