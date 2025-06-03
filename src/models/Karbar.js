import { model, models, Schema } from "mongoose";

const karbarSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Karbar = models.Karbar || model("Karbar", karbarSchema);

export default Karbar;
