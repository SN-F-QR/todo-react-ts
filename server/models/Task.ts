import { Schema, model, Document } from "mongoose";

const TaskSchema = new Schema({
  creator_id: String,
  parent: String,
  title: String,
  finished: Boolean,
  date: Date,
});

export interface Task extends Document {
  creator_id: string;
  parent?: string;
  title: string;
  finished: boolean;
  date: Date;
}

const TaskModel = model<Task>("Task", TaskSchema);

export default TaskModel;
