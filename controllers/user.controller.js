import { dataBaseCall,createUser,updatePassword,deleteUser } from '../service/user.service.js';
import { validation, userComparePassword,loginValidation } from '../Utils/utils.js';
import { getAllRooms } from '../service/room.service.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
        
        // Check if user already exists
        const existingUser = await dataBaseCall(email);
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        
        // Validate user input
        const result = validation(email, password, firstname, lastname);
        if (result.error) {
            return res.status(400).json({
                message: result.error.details[0].message
            });
        }
        
        // Create user in the database
        const createUserResult = await createUser(email, password, firstname, lastname);
        res.status(200).json({ message: "User successfully created", user: createUserResult });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate user input
        const result = loginValidation(email, password);
        if (result.error) {
            return res.status(400).json({
                message: result.error.details[0].message
            });
        }
        
        // Compare password and authenticate user
        const comparePasswordResult = await userComparePassword(email, password);
        if (!comparePasswordResult.match) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }
        
        // Check if user exists
        if (!comparePasswordResult.user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        // Generate JWT token and set cookie
        const userEmail = comparePasswordResult.user;
        const payload = { email: userEmail };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true });
        
        // Fetch all rooms
        const rooms = await getAllRooms();
        
        return res.status(200).json({ message: "User successfully login"});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await dataBaseCall(email);
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const userId = existingUser._id;
        const updatedUser = await updatePassword(userId, password);
        if (!updatedUser) {
            return res.status(400).json({ message: "Couldn't update password" });
        }
        return res.status(200).json({message:"password change successful"});
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteUsers= async(req, res) =>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({
                message:"Please provide email"
            })
        }
       const getuserid= await dataBaseCall(email)
        const id = getuserid._id
        const deletedUser = await deleteUser(id);
        if(!deletedUser){
            return res.status(400).json({
                message:"Couldn't delete user"
            })
        }
        return res.status(200).json({message:"user deleted successfully"});
    }catch(error){
  return res.status(500).json({
            message: "Internal server error"
        })
    }
}