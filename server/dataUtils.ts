import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

/**
 * Handles the GET request for a model using userId and parent
 * @T interface of data (extends Document)
 * @param model of data in the database
 * @returns handler function
 */
const handleGet =
  <T>(model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items: T[] | null = await model.find({
        creator_id: req.user!._id,
        parent: req.params.parentid,
      });
      return res.send(items);
    } catch (err) {
      next(err);
      return res.status(500).json({ error: "Failed to get the items from the database" });
    }
  };

export { handleGet };
