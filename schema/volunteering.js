import joi from "joi";

export const volunteeringSchema = joi.object({
    organization: joi.string(),
    description: joi.string(),
    location: joi.string(),
    skills: joi.string(),
    role: joi.string(),
    responsibility: joi.string(),
    projectName: joi.string(),
    startDate: joi.date(),
    endDate: joi.date()
})