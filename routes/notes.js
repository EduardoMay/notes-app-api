import { Router } from "express";
import { getNotes } from "../controllers/notes.controller";

const router = new Router();

router.get("/notes", getNotes);

export default router;
