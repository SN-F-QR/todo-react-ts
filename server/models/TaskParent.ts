import { Schema, model, Document } from "mongoose";

export interface TaskParent extends Document {
  creator_id: string;
  title: string;
  date: Date;
  parent: string;
}

const TaskParentSchema = new Schema({
  creator_id: String,
  title: String,
  date: Date,
  parent: String,
});

const TaskParentModel = model<TaskParent>("TaskParent", TaskParentSchema);
export default TaskParentModel;
