import joi from 'joi';
import bcrypt from 'bcryptjs';
import {adminDataBaseCall} from '../service/admin.service.js'
import { dataBaseCall } from '../service/user.service.js';

const joiUserSchema =joi.object ({
    email: joi.string().email().required(),
    password: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
});

const joiLoginSchema= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const validation=(email, password, firstname, lastname)=>{
    try{
        const result = joiUserSchema.validate({
            email,
            password,
            firstname,
            lastname
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }
}
export const loginValidation=(email, password)=>{
    try{
        const result = joiLoginSchema.validate({
            email,
            password,
           
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }
}
export const comparePassword =async (email, password)=>{
    try{
        const loginUser= await adminDataBaseCall(email);
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password,loginUser.password,(error,outCome)=>{
        if(error){
            reject(error);
        }else{
            resolve(outCome);
        }
    })
});
  return {match , loginUser};
}catch(error){
    throw error;
}
}


export const userComparePassword= async(email, password)=>{
    try{
        const user= await dataBaseCall(email);
        if (!user) {
            return { match: false, message: "User not found" };
        }
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password,user.password,(error,outCome)=>{
        if(error){
            reject(error);
        }else{
            resolve(outCome);
        }
    })
});
  return {match , user};
}catch(error){
    throw error;
}
}