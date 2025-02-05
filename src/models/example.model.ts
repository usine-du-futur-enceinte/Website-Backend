import { Schema, model } from "mongoose";

const exampleSchema = new Schema({
  _id: Number,
  name: String,
});

const Example = model("example", exampleSchema);

export default Example;
