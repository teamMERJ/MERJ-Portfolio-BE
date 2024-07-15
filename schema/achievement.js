import joi from "joi";

export const achievementSchema = joi.object({
    award: joi.string().required(),
    description: joi.string(),
    image: joi.string(),
    date: joi.string(),
    nameOfInstitution: joi.string().required(),
    user: joi.string() 
})