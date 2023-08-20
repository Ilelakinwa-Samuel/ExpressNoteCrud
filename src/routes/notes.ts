import express from "express";
import {
  create_Note,
  delete_Note,
  get_Note,
  getAllNotes,
  update_Note,
} from "../controller/notes";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/create", auth, create_Note);
router.get("/", auth, getAllNotes);
router.put("/update/:id", update_Note);
router.delete("/delete/:id", delete_Note);
router.get("/notes/id", get_Note);

export default router;
