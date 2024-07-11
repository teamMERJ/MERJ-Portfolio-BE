import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";
import { userSchema } from "../schema/user.js";

 export const signUp = async (req, res) =>{

    const {error, value} = userSchema.validate(req.body)
    if (error) {
     res.status(400).send(error.details[0].message)
    }
    const email = value.email

    const findIfUserExist = await UserModel.findOne({email})
    if (findIfUserExist){
        return res.status(401).send('User has already signed up')
    }else{

        const hashedPassword = await bcrypt.hash(value.password, 12)
      value.password = hashedPassword
        const addUser = await UserModel.create(value)
        return res.status(201).send(addUser)
    }
};



export const getUser = async (req, res) => {
//    get user by ID
    const userId = req.params.userId
// use 'select' to exclude the password and 'populate' to populate the education
const userDetails = await UserModel.findById(userId)
.select('-password')
.populate('education')

return res.status(201).json({userDetails})

}