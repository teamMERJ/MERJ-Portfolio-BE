
import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import { User } from "../models/user.js";
import { userSchema } from "../schema/user.js";
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {
    try {
        const { error, value } = userSchema.validate(req.body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        const email = value.email
        console.log('email', email)

        const findIfUserExist = await userModel.findOne({ email })
        if (findIfUserExist) {
            return res.status(401).send('User has already signed up')
        } else {

            const hashedPassword = await bcrypt.hash(value.password, 12)
            value.password = hashedPassword

            const addUser = await userModel.create(value)
            req.session.user = { id: addUser.id }
            return res.status(201).send(addUser)
        }
    } catch (error) {
        next(error)
      
export const signup = async (req, res) => {

    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const email = value.email

    const findIfUserExist = await User.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('User has already signed up')
    }else{

        const hashedPassword = await bcrypt.hash(value.password, 12)
         value.password = hashedPassword

        const addUser =  await User.create(value)

        req.session.user = { id: addUser.id }

        return res.status(201).send(addUser)
    }



export const login = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        // find a user using their email or username
        const user = await userModel.findOne({
            $or: [
                { email: email },
                { userName: userName }
            ]
        });
        if (!user) {
            return res.status(401).json('User does not exist')
        } else {
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
        }

}


// Login user
export const login = async (req, res, next) => {
    try {
       const { userName, email, password } = req.body;
       //  Find a user using their email or username
       const user = await User.findOne(
          { $or: [{ email: email }, { userName: userName }] }
       );
       if (!user) {
          return res.status(401).json('User does not exist')
       }
       // Verify user password
       const correctPass = bcrypt.compareSync(password, user.password)
       if (!correctPass) {
          return res.status(401).json('Invalid login details')
       }
       // Generate a session for the user
       req.session.user = { id: user.id }

       console.log('user', req.session.user)
       // Return response
       res.status(201).json('Login successful')
      
    } catch (error) {
       next(error)
    }
 }


export const getUser = async (req, res) => {

    //    get user by ID
    try {
        const userId = req.params.id
        // use 'select' to exclude the password and 'populate' to populate the education
        const userDetails = await userModel.findById(userId)
            .select('-password')
        .populate('education');
        if (userDetails) {
            return res.status(404).send("User not found");
        }
        return res.status(201).json({ userDetails })
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// confirm if username already exist
export const getUsername = async (req, res) => {
    try {
        const { filter = "{}" } = req.query;

        // checking the usernames in the database
        const allUser = await userModel
            .find(JSON.parse(filter))
            // return response
        res.status(200).json(allUser)
    } catch (error) {
        return res.status(404).send(error.message);
    }
};


    
    const userName = req.params.userName

    //get user based on the user id
    //use the select to exclude the password
    //use populate to populate the education
    const userDetails = await User.find({userName})
    .populate('education')
    .populate('userProfile')
     
    return res.status(200).json({user: userDetails})   
}


export const getUsers = async (req, res) => {
     const { email, userName } = req.query;

     const filter = {};
     if (email) {
         filter.email = email;
     }
     if (userName) {
         filter.userName = userName;
     }

     const users = await User.find(filter);
     
    return res.status(200).json({users})
    
}


export const logout = async (req, res, next) => {
    try {
       // Destroy user session
       await req.session.destroy();
       // Return response
       res.status(200).json('User logged out')
    } catch (error) {
       next(error)
    }
 }