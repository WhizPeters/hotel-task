import Admin from "../model/admin.js";
import { hashPassword } from "../Utils/utils.js";
import User from "../model/user.model.js";

// Function to retrieve admin data from the database based on email
export const adminDataBaseCall = async (email) => {
    try {
        const existingUser = await Admin.findOne({ email });
        return existingUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export   const updatePasswordAdim= async (userid, password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await Admin.findOneAndUpdate({_id:userid},{password:hashedPassword},{new:true})
    return updatedUser;
}

// Function to create a new user (admin)
export const user= async (email, password, firstname, lastname, role) => {
    try {
        // Hash the password before saving to the database
        const hashedPassword = await hashPassword(password);
        
        // Create a new Admin instance with hashed password
        const newUser = new Admin({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            role,
        });
        
        // Save the new user to the database
       const saveUser= await newUser.save();
       return saveUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser=async(id)=>{
   try{
    const deleteUser = await User.findByIdAndDelete(id);
   return deleteUser;
   }catch(error){
    console.log(error);
    throw error
   }
}