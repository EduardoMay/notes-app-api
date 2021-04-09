import { Router } from "express";
import { setFavorite } from "../controllers/favorites.controller";

const router = new Router();

router.put("/:id", setFavorite);

export default router;
