import User from "../model/user.model.js";
import { hashPassword } from "../Utils/utils.js";

// Function to find a user by email
export const dataBaseCall = async (email) => {
    try {
        const existingUser = await User.findOne({ email });
        return existingUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export   const updatePassword= async (userid,password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findOneAndUpdate({_id:userid},{password:hashedPassword},{new:true})
    return updatedUser;
}

// Function to create a new user
export const createUser = async (email, password, firstname, lastname) => {
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });
       const newuser= await newUser.save();
       return newuser;
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