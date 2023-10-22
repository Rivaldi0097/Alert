import { InferSchemaType, Schema, model } from "mongoose";
import DocumentSchema from "../models/document";

const triggeredAlertSchema = new Schema({
    alerts: [{
        alertName: { type: String, required: true},
        foundKeywords: [String],
        foundAttributes: [{
            name: { type: String },
            value: { type: String}
        }],
        foundLocation: [String],
        alertDetails: [{
            _id: { type: String },
            name: { type: String },
            keywords: { type: [String] },
            locations: { type: [String] },
            attributes: [{
                name: { type: String },
                value: { type: String}
            }],
            createdAt: { type: String },
            updatedAt: { type: String }
        }]
    }],
    document: [{
        title: { type: String, required: true},
        content: { type: String, required: true},
        details:[{
            name: { type: String },
            value: { type: String}
        }]
    }]
})

type TriggeredAlert = InferSchemaType<typeof triggeredAlertSchema>

export default model<TriggeredAlert>("TriggeredAlert", triggeredAlertSchema);