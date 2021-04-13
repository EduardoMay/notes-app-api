import { Router } from "express";
import {
  deleteLabel,
  get,
  getById,
  post,
  update
} from "../controllers/Labels.controller";

const router = Router();

router.post("/", post);
router.get("/", get);
router.get("/:id", getById);
router.delete("/:id", deleteLabel);
router.put("/:id", update);

export default router;
