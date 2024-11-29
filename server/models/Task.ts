import { Schema, model, Document } from "mongoose";

const TaskSchema = new Schema({
  creator_id: String,
  title: String,
  date: Date,
});

export interface Task extends Document {
  creator_id: string;
  title: string;
  date: Date;
}

const TaskModel = model<Task>("Task", TaskSchema);

export default TaskModel;
