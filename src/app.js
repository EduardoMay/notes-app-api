import express from "express";
import cors from "cors";
import morgan from "morgan";

// Routes
import NotesRouter from "./routes/notes";

const app = express();

app.set("port", process.env.PORT || 3005);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API Notes App" });
});

app.use("/api/v1", NotesRouter);

export default app;
