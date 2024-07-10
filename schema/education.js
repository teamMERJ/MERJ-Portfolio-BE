import joi from "joi"

export const educationSchema = joi.object({
    schoolName: joi.string().required(),
    location: joi.string(),
    programme: joi.string(),
    qualification: joi.string(),
    grade: joi.string(),
    startDate: joi.date(),
    endDate: joi.date()
})