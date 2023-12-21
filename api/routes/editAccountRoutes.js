import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import editAccountController from "../controllers/editAccountController.js";

const router = express.Router();
router.use(requireAuth);

router.patch("/edit".editAccountController.editInfo);
router.delete("/delete", editAccountController.deleteAccount);

export default router;
