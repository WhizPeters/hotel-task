import { comparePassword, validation, loginValidation } from '../Utils/utils.js';
import { user } from '../service/admin.service.js';
import { adminDataBaseCall,updatePasswordAdim,deleteUser } from '../service/admin.service.js';
import {dataBaseCall} from '../service/user.service.js'
import jwt from 'jsonwebtoken';

// Function to handle admin signup
export const adminSignup = async (req, res) => {
    try {
        const { email, password, firstname, lastname, role } = req.body;

        // Validate admin input
        const result = validation(email, password, firstname, lastname);
        if (result.error) {
            return res.status(400).json({
                message: result.error.details[0].message
            });
        }

        // Check if admin already exists
        const existingAdmin = await adminDataBaseCall(email);
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }

        // Create admin in the database
        const createdAdmin = await user(email, password, firstname, lastname, role);
        res.status(200).json({ message: "Admin successfully created" });
    } catch (error) {
        console.error("Error in adminSignup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Function to handle admin login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate admin input
        const result = loginValidation(email, password);
        if (result.error) {
            return res.status(400).json({
                message: result.error.details[0].message
            });
        }

        // Compare password and authenticate admin
        const comparePasswordResult = await comparePassword(email, password);
        if (!comparePasswordResult.match) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Check if admin exists
        if (!comparePasswordResult.loginUser) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        // Generate JWT token and set cookie
        const userEmail = comparePasswordResult.loginUser;
        const payload = { email: userEmail };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ message: "Admin successfully login" });
    } catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPasswordAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await adminDataBaseCall(email);
        if (!existingAdmin) {
            return res.status(400).json({ message: "Admin does not exist" });
        }
        const adminId = existingAdmin._id;
        const updatedAdmin = await updatePasswordAdim(adminId, password);
        if (!updatedAdmin) {
            return res.status(400).json({ message: "Couldn't update password" });
        }
        return res.status(200).json({message:"password change successful"});
    } catch (error) {
        console.error("Error in forgotPasswordAdmin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteuser = async(req, res) =>{
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