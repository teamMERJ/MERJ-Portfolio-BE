import { UserProfile } from "../models/userProfile.js";
import { profileSchema } from "../schema/userProfile.js";

export const postProfile = async (req, res) => {
    try {
        const  {error, value } = profileSchema.validate(req.body)
    if (error) {
        res.status(400).json(error.details[0].message)
    }
     console.log('value', value)

     const userProfile = await UserProfile.create(value)
     res.status(201).json(userProfile)
}
     catch (error) {
        next(error)
    }
};
  
export const getAllProfile = async(req, res, next) => {
    try {
        const allProfile = await UserProfile.find()
        if (allProfile.length == 0){
            return res.status(404).send('No education added')
        }
    } catch (error) {
        next(error)
    }
};


export const getOneProfile = async (req, res, next) =>{
   try {
    const getProfile = await UserProfile.findById(req.params.id)
    res.status(200).json(getProfile)
   } catch (error) {
        next(error)
   }
};


export const patchProfile = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}


export const deleteuserProfile = async (req, res) => {
    try {
      const { error, value } = profileSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      console.log('value', value)

      const deletedprofile = await UserProfile.findByIdAndDelete(
        req.params.id
      );
      res.status(200).send(`Profile with ID ${deletedprofile} has deleted `);
    } catch (error) {
      console.log(error)
    }
  };