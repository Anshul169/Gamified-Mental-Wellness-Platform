import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"

async function connect() {
    try {
        const res = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )
        if (res)
            console.log(
                `Established connection with DB successfully @${res.connection.host}`
            )
        return res
    } catch (error) {
        throw error
    }
}

export default connect
