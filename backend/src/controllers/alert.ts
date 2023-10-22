import { RequestHandler } from "express";
import createHttpError from "http-errors";
import AlertModel from "../models/alert";

interface createAlert{
    name: string,
    keywords: string[],
    locations: string[],
    attributes: [{
        name: string,
        value: string
    }]
}

export const createAlert: RequestHandler<unknown, unknown, createAlert, unknown> = async (req, res, next) => {
    const name = req.body.name;
    const keywords = req.body.keywords;
    const locations = req.body.locations;
    const attributes  = req.body.attributes;

    try {
        

        if(!name || !keywords || !locations || !attributes){
            throw createHttpError(400, "Missing parameters")
        }

        const newAlert = await AlertModel.create({
            name: name,
            keywords: keywords,
            locations: locations,
            attributes: attributes
        })

        res.status(200).json(newAlert)

    } catch (error) {
        next(error)
    }
}

export const getAlerts: RequestHandler = async (req, res, next) => {
    try {
        
        const alerts = await AlertModel.find().exec();
        res.status(200).json(alerts);

    } catch (error) {
        next(error)
    }
}