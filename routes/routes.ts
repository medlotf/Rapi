import { getRapper, getRappers, addRapper, updateRapper, deleteRapper } from './../controllers/rapperController.ts';
import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

router.get("/rappers",getRappers)
    .get("/rappers/:id",getRapper)
    .post("/rappers",addRapper)
    .put("/rappers/:id",updateRapper)
    .delete("/rappers/:id",deleteRapper)

export default router