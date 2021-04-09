import { Router } from "express";
import { setFavorite } from "../controllers/favorites.controller";

const router = Router();

router.put("/:id", setFavorite);

export default router;
