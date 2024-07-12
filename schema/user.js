import joi from 'joi'

export const userSchema = joi.object({
  
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        otherNames: joi.string(),
        email: joi.string().email().required(),
        password: joi.string().password(4).required(),
        confirmedPassword: joi.ref('password'),
        userName: joi.string(),
        termsAndConditions: joi.boolean()
}) .with('password', 'confirmedPassword');