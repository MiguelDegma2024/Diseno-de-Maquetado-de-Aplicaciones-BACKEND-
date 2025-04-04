import { Router } from "express";
import {
  /* createBranch,*/
  deleteBranch,
  getAllBranches,
  getBranchById,
  /*modifyBranch,*/
} from "../controllers/branchController";

const branchRouter: Router = Router();

branchRouter.get("/", getAllBranches);

branchRouter.get("/:id", getBranchById);

/*branchRouter.post("/", createBranch);

branchRouter.patch("/:id", modifyBranch);*/

branchRouter.delete("/", deleteBranch);

export default branchRouter;
