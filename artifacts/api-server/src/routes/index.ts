import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import brandsRouter from "./brands";
import uploadRouter from "./upload";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/admin", adminRouter);
router.use("/admin", uploadRouter);
router.use(brandsRouter);
router.use(contactRouter);

export default router;
