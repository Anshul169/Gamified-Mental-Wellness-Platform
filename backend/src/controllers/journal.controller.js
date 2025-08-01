import Journal from "../models/journal.model.js"
import asyncWrapper from "../utils/asyncWrapper.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

export const createJournal = asyncWrapper(async(req,res)=>{
    const {userId,content} = req.body
    const journal = await Journal.create({userId,content})
    if(!journal){
        throw new ApiError({
            message: "Journal cannot be created",
            statusCode: 400
        })
    }
    res.status(200).json((new ApiResponse({
        statusCode:200,
        message:"Journal has been created successfyllly",
        
    })))
})

export const lastTenJournals = asyncWrapper(async(req,res)=>{
    const {userId} = req.body
    const data = await Journal.find({userId}).sort('-createdAt').limit(10)
    if(!data){
        throw new ApiError({
            message:"Journal cannot be fetched for the user at the time",
            statusCode:401
        })
    }
    res.json(new ApiResponse({
        statusCode:200,
        message:"Journal has been created successfyllly",
        data : data
    }))
})