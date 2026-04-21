import express from "express";
import {
  getProblems,
  getProblemById,
  createProblem,
  joinProlem,
  updateProblemStatus,
  addProblemUpdate,
} from "../controller/problemController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/:id", getProblemById);

// 🔥 ADD MULTER HERE (IMPORTANT)
router.post("/", upload.single("image"), createProblem);

router.post("/:id/join", joinProlem);
router.post("/:id/status", updateProblemStatus);
router.post("/:id/update", addProblemUpdate);

export default router;