import joi from "joi";

export const skillsSchema = joi.object({
    name: joi.string(),
    levelOfProficiency: string().valid('beginner', 'intermediate', 'advanced', 'expert'), 
})