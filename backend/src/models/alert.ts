import { InferSchemaType, Schema, model } from "mongoose";

const alertSchema = new Schema({
    name: {type: String, required: true},
    keywords: {type: [String]},
    locations: {type: [String], required: true},
    attributes: [{
        name: { type: String },
        value: { type: String}
    }]
}, {timestamps: true})

type Alert = InferSchemaType<typeof alertSchema>;

export default model<Alert>("Alert", alertSchema);