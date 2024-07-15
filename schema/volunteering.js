import joi from "joi";

export const volunteeringSchema = joi.object({
    organization: joi.string().required(),
    description: joi.string(),
    location: joi.string(),
    skills: joi.string(),
    role: joi.string().required(),
    responsibility: joi.string(),
    projectName: joi.string(),
    startDate: joi.date().required(),
    endDate: joi.date()
})