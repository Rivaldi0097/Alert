import { RequestHandler } from "express";
import createHttpError from "http-errors";
import DocumentModel from "../models/document";
import TriggeredAlertModel from "../models/triggeredAlert";
import AlertModel from "../models/alert";
import * as DocumentChecker from "../util/documentChecker";

interface createDocument{
    title: string,
    content: string,
    details:[{
        name: string,
        value: string
    }]
}


export const createDocument: RequestHandler<unknown, unknown, createDocument, unknown> = async (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;
    const details = req.body.details;
    const location = ["singapore"]

    try {

        if(!title || !content || !details){
            throw createHttpError(400, "Missing information")
        }

        //retrieve all alerts in db
        const alertList = await AlertModel.find().exec();

        const alertOutput = []
        const documentOutput = []

        //check the document against all alerts
        for(let alert of alertList){
 
            const keywordList = alert.keywords;
            const locationList = alert.locations;
            const attributesList = alert.attributes;

            //check document content if it contains any of the alert keywords
            const foundKeywords =  DocumentChecker.checkKeyword({keywordList, content})

            //check if document location is part of any of the alert locations
            const foundLocation = DocumentChecker.checkLocation({locationList, location})

            //check if document detaials is part of alert attribute
            const foundAttribute = DocumentChecker.checkAttributes({attributesList, details})
            
            //only push if at least one of the list has returned value
            if(!(foundKeywords.length === 0 && foundLocation.length === 0 && foundAttribute.length === 0)){
                alertOutput.push({
                    alertName: alert.name,
                    foundKeywords: foundKeywords,
                    foundLocation: foundLocation,
                    foundAttributes: foundAttribute,
                    alertDetails: [alert]
                })
            }
        }


        if(alertOutput.length > 0){
            //this is run when there is alert triggered
            documentOutput.push(req.body)
            
            //to store the document
            const newDocument = await DocumentModel.create({
                title: title,
                content: content,
                details: details
            })

            //to store the triggered alerts with the document
            const newTriggeredAlert = await TriggeredAlertModel.create({
                alerts: alertOutput,
                document: documentOutput
            })
                
            res.status(200).json({
                alertTriggered: true,
                information: newTriggeredAlert
            });

        }else{

            //this is run when there is no alerts triggered
            const newDocument = await DocumentModel.create({
                title: title,
                content: content,
                details: details
            })

            res.status(200).json({
                alertTriggered: false,
                information: newDocument
            })

        }

    } catch (error) {
        next(error)
    }

}