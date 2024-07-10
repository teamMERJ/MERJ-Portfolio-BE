import joi from "joi";

export const achievementsSchema = joi.object({
    awards: joi.string(),
    description: joi.string(),
    image: joi.string(),
    date: joi.date(),
    nameOfInstitution: joi.string()
})