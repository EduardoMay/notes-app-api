import { Router } from "express";
import {
  deleteById,
  get,
  getById,
  post,
  update
} from "../controllers/notes.controller";

const router = new Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", post);
router.delete("/:id", deleteById);
router.put("/:id", update);

export default router;
