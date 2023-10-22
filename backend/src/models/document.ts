import { InferSchemaType, Schema, model } from "mongoose";

const documentSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    details: [{
        name: { type: String },
        value: { type: String}
    }]
}, {timestamps: true})

type Document = InferSchemaType<typeof documentSchema>;

export default model<Document>("Document", documentSchema)