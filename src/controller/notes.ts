import { NextFunction, Request, Response, request, response } from "express";
import { v4 as UUIDV4 } from "uuid";
import { Notes, NoteAttributes } from "../model/notes";
import { promises } from "dns";
import { options, updatenoteschema, create_NoteSchema } from "../utils/utils";
import { any } from "joi";

//CREATE NOTES

export const create_Note = async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;
    console.log(verified);

    const id = UUIDV4();
    //const { title, description, duedate, status } = req.body; instead of this...

    const noteRecord = await Notes.create({
      id,
      ...req.body,
      userId: verified.id,
    });

    return res.status(201).json({
      msg: "Note successfully created",
      noteRecord,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
};

// GET notes

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Find all notes
    // sequelize, its findAll or findAndCountAll

    //Using findAll
    // const getAllnotes = await Notes.findAll();
    //   return res.status(200).json({
    //     msg: "You have successfully retrieved all data",
    //     getAllnotes
    //   })

    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;

    //Using findAllCountAll
    const getAllnotes = await Notes.findAndCountAll({
      limit: limit,
      offset: offset,
    });
    return res.status(200).json({
      msg: "You have successfully retrieved all data",
      count: getAllnotes.count,
      notes: getAllnotes.rows,
    });

    // if (notes) {
    //   return res.status(200).json({
    //     message: notes,
    //   });
    // }
    // return res.status(404).json({
    //   message: "Notes does not exist",
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error message",
    });
  }
};

//GET NOTE
export async function get_Note(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body.id);
    const user = await Notes.findByPk(req.body.id);

    console.log({ user });
    console.log(req.body);
    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "No note found",
    });
  }
}

// UPDATE NOTE

export const update_Note = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { id } = req.params;
    const id = req.params.id;

    const { title, description, duedate, status } = req.body;

    //validate with joi
    const validatedResult = updatenoteschema.validate(req.body, options);

    if (validatedResult.error) {
      return res.status(400).json({
        Error: validatedResult.error.details[0].message,
      });
    }

    const noteUpdate = await Notes.findOne({ where: { id } });

    if (!noteUpdate) {
      res.status(400).json({
        error: "Cannot find existing note",
      });
    }

    const correct = await noteUpdate?.update({
      id,
      ...req.body,
    });

    return res.status(200).json({
      msg: "You have successfully updated your results",
      correct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
};

// DELETE NOTE

export const delete_Note = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const record = await Notes.findOne({ where: { id } });

    if (!record) {
      return res.status(404).json({ error: "Cannot find existing note" });
    }

    await record.destroy();

    return res.status(204).json({ msg: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
