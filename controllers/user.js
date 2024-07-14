import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { userSchema } from "../schema/user.js";

export const signUp = async (req, res) => {

    const { error, value } = userSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    const email = value.email

    const findIfUserExist = await User.findOne({ email })
    if (findIfUserExist) {
        return res.status(401).send('User has already signed up')
    } else {

        const hashedPassword = await bcrypt.hash(value.password, 12)
        value.password = hashedPassword

        const addUser = await User.create(value)
        req.session.user = {id: addUser.id}
        return res.status(201).send(addUser)
    }
};


export const login = async () => {
    try {
        const { userName, email, password } = req.body;
        // find a user using their email or username
        const user = await User.findOne(
            { $or: [{ email: email }, { userName: userName }] }
        );
        if (!user) {
            return res.status(401).json('User does not exist')
        }
        // verify user password
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (!correctPassword) {
            return res.status(401).json('Invalid login details')
        }
        // generate a session for the user
        req.session.user = { id: user.id }
        console.log('user', req.session.user)
        // returnn response
        res.status(201).json('Login successful')
    } catch (error) {
        next(error)
    }
};



export const getUser = async (req, res) => {
    //    get user by ID
    const userId = req.params.id
    // use 'select' to exclude the password and 'populate' to populate the education
    const userDetails = await User.findById(userId)
        .select('-password')
    // .populate('education')

    return res.status(201).json({ userDetails })

}

