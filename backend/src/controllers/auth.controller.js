import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import cloudinary from "../lib/cloudinary.js"

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
export const login = async (req,res)=>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({
        _id:user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
    })

    } catch (error) {
        console.log("Error in login controller", error.mesage)
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const logout = (req,res)=>{
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required"})

        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic) 
        const updateUser = await User.findOneAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})

        res.status(200).json(updateUser)

    } catch (error) {
        console.log("Error in update profile:" , error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}