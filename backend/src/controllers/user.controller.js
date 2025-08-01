import asyncWrapper from "../utils/asyncWrapper.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import { COOKIE_OPTIONS } from "../constants.js"
import meditation from "../models/meditation.model.js"
import mongoose from "mongoose"

export const register = asyncWrapper(async (req, res) => {
    // Extract data from request body
    const { username, email, password } = req.body
    
    // Checking whether all the required fields were sent ot not
    if (
        [username, email, password].some(
            (field) => field?.trim() == ""
        )
    ) {
        throw new ApiError({
            message: "All fields are compulsory",
            statusCode: 400
        })
    }
    
    // Checking whether a user with sent username or email already exists
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError({
            message: "User already exist",
            statusCode: 409
        })
    }
    
    // Make entry into DB
    const user = await User.create({
        email,
        username,
        password
    })
    

    const createdUser = await User.findById(user._id).select(
        "-password"
    )
    if (!createdUser) {
        throw new ApiError({
            message: "Couldn't register user",
            statusCode: 500
        })
    }

    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "User registered successfully",
            data: createdUser
        })
    )
})

export const login = asyncWrapper(async (req, res) => {
    // Extract data (username & password) from request body
    const { username, password } = req.body
    // Throw error if required data not provided
    if (!username || !password) {
        throw new ApiError({
            message: "Username & Password are both required",
            statusCode: 400
        })
    }
    // Check whether the user already have an account or not
    let user = await User.findOne({ username })
    if (!user) {
        throw new ApiError({
            message: "User not registered",
            statusCode: 400
        })
    }
    // Check password
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError({
            message: "Invalid credentials",
            statusCode: 400
        })
    }

    const accessToken = user.generateAccessToken()

    return res
        .status(200)
        .cookie("accessToken", accessToken, COOKIE_OPTIONS) // send cookies
        .json(
            new ApiResponse({
                statusCode: 200,
                message: "User logged in successfully",
                data: {
                    ...user,
                    accessToken
                }
            })
        )
})

export const logout = asyncWrapper(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .json(
            new ApiResponse({
                message: "User logged out succesfully",
                statusCode: 200
            })
        )
})

export const getCurrentUser = asyncWrapper(async (req, res) => {
    return res.status(200).json(
        new ApiResponse({
            message: "OK",
            statusCode: 200,
            data: req.user
        })
    )
})

export const updateBadgeCount = asyncWrapper(async (req,res)=>{
    const {badges} = req.body
    await User.findByIdAndUpdate(
        req.user?._id,
        { $set: { badges } },
        { new: true }
    )
    return res.status(200).json(
        new ApiResponse({
            statusCode: 200,
            message: "Badge count updated successfully"
        })
    )
})

export const updateScore = asyncWrapper(async(req,res)=> {
    const {id} = req.body
    const user = await User.findById(id)
    if(!user){
        throw new ApiError({
            statusCode:401,
            message:"User cannot be found in this schema",
        })
    }
    const todayDate = new Date()
    const finalTodayDate = todayDate.toLocaleDateString("en-GB")
    const {updatedAt} = req.body
    console.log("Updated at",updatedAt)
    console.log(finalTodayDate)
    if(finalTodayDate === updatedAt.toLocaleDateString("en-GB")){
        throw new ApiError({
            statusCode:401,
            message:"Meditating on same day"
        })
    }
    const updatedUser = await User.findByIdAndUpdate(id,{
        $set:{
            score:user.score + 1
        }
    },{new:true})
    if(!updatedUser){
        throw new Error({
            statusCode:401,
            message:"Score cannot be updated successfully"
        })
    }
    return res.status(200).json(new ApiResponse({
        statusCode:200,
        message:"Score has been updated successfully",
        data:updatedUser,
    }))
})


export const createMeditate = asyncWrapper(async(req,res)=>{
    //we need user id as userId in the body
    const {username,time} = req.body
    if(!username){
        console.log(username)
        
        throw new ApiError({
            statusCode:401,
            message:"Meditation cannot be created without the user presence"
        })
    }
    const user = new meditation({
        username,
        time
    })
    const updatedUser = await user.save()
    console.log("usr : ", updatedUser)
    
    if(!updatedUser){
        throw new ApiError({
            message:"meditation cannot be created in the schema of meditation",
            statusCode:400,
        })
    }
    console.log("Meditation entry made")
    
    return res.status(200).json(new ApiResponse({
        statusCode:200,
        message:"User has been updated successfully",
        data:updatedUser,
    }))
})

export const getMeditate = asyncWrapper(async(req,res)=>{
    const {username} = req.body
    const data = await meditation.find({username}).sort("-createdAt").limit(10)

    if(!data){
        throw new ApiError({
            message:"Meditation data cannot be fetched.",
            statusCode:401,
        })
    }
    return res.status(200).json(
        new ApiResponse({
            statusCode:200,
            message:"These are latest entries of the meditation for current user",
            data
        })
    )
})