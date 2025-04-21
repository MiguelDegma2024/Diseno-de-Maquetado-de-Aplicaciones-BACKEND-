import { Router, Request, Response } from "express";
import productRoutes from "./productRoutes";
import branchRoutes from "./branchRoutes";
import userRoutes from "./userRoutes";
import ManagerRoutes from "./managerRoutes"


const apiRouter: Router = Router();

apiRouter.use("/product", productRoutes);
apiRouter.use("/branch", branchRoutes);
apiRouter.use("/user", userRoutes);
apiRouter.use("/manager",ManagerRoutes)

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default apiRouter;
