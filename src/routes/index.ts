import { Router, Request, Response } from "express";
import productRoutes from "./productRoutes";
import branchRoutes from "./branchRoutes";
import userRoutes from "./userRoutes";
import ManagerRoutes from "./managerRoutes"
import CategoryRoutes from "./categoryRoutes"
import authRoutes from "./authRoutes"


const apiRouter: Router = Router();

apiRouter.use("/product", productRoutes);
apiRouter.use("/branch", branchRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/manager",ManagerRoutes)
apiRouter.use("/category", CategoryRoutes)
apiRouter.use("/auth", authRoutes)

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default apiRouter;
