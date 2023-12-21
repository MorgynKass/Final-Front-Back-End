import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import accountController from "../controllers/accountController";

const router = express.Router();

router.get("/all", accountController.accountAll);
router.get("/currentUser", requireAuth, accountController.accountCurrent);
router.post("/login", accountController.accountLogin);
router.post("/logout", requireAuth, accountController.accountLogout);
router.post("/register", accountController.accountRegister);

export default router;
