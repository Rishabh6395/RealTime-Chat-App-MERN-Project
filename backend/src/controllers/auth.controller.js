import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const signup = async(req,res)=>{
    const {fullname,email,password} = req.body
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({error:'All fields are required'})
        }

        if(password.lenght < 6){
            return res.status(400).json({error:'Password must be at least 6 characters long'})
        }
        const user = await User.findOne({email})
        if(user) return res.status(400).json({error:'User already exists'})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({fullname,email,password:hashedPassword})

        if(newUser){
            // generate jwt token
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else{
            res.status(400).json({mesage: "Invalid credentials"})
        }

    } catch (error) {
        console.log("Error in signup: ", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const login = (req,res)=>{
    res.send('login Route')
}
export const logout = (req,res)=>{
    res.send('logout Route')
}