import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { HASHING_ROUNDS } from "../constants.js"
import {accessTokenExpiry} from "../constants.js"

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        badges: {
            type: Number,
            default: 0
        },
        score: {
            type: Number,
            default: 0
        },
        lastMeditatedOn: {
            type: Date
        }
    },
    { timestamps: true }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, HASHING_ROUNDS)
    next()
})

// Injecting methods into the Schema object
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessTokenExpiry }
    )
}

const User = mongoose.model("User", UserSchema)

export default User
