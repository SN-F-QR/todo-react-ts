import { Schema, model, Document } from "mongoose";

export interface TaskParent extends Document {
  creator_id: string;
  title: string;
  description: string;
  date: Date;
  parent: string;
}

const TaskParentSchema = new Schema({
  creator_id: String,
  title: String,
  description: String,
  date: Date,
  parent: String,
});

export interface TaskFile extends Document {
  creator_id: string;
  name: string;
  date: Date;
}

const TaskFileSchema = new Schema({
  creator_id: String,
  name: String,
  date: Date,
});

const TaskParentModel = model<TaskParent>("TaskParent", TaskParentSchema);
const TaskFileModel = model<TaskFile>("TaskFile", TaskFileSchema);
export default { TaskParentModel, TaskFileModel };
