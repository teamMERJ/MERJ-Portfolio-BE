import joi from 'joi';

export const profileSchema = joi.object({
    profilePicture: joi.string(),
    location: joi.string(),
    maritalStatus: joi.string(),
    sex: joi.string(),
    bio: joi.string(),
    about: joi.string(),
    dateOfBirth: joi.number()
        .integer()
        .min(1900)
        .max(2013),
    contact: joi.number(),
    cv: joi.string(),
    languages: joi.string()
});