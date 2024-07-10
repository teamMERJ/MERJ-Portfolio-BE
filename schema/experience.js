import joi from "joi";

export const experienceSchema = joi.object({
    companyName: joi.string(),
    role: joi.string(),
    skills: joi.string(),
    responsibility: joi.string(),
    location: joi.string(),
    startDate: joi.date(),
    endDate: joi.date()
}) 