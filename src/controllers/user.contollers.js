require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

/**
 * @method - POST
 * @param - /register
 * @description - User Create
 */

// exports.SignUp = async (req, res) => {
//     try {
//         let Validate = validationResult(req);

//         if (!Validate.isEmpty()) {
//             console.log(Validate.array());
//             return res.status(200).json(Validate.array()[0].msg);
//         }

//         const password = req.body.password;
//         const passwordHash = await bcrypt.hash(password, 10);
//         const user = new User({
//             mobileNumber:req.body.mobileNumber,
//             email: req.body.email,
//             password: passwordHash,

//         });
//         const userData = await User.findOne({ email: req.body.email })
//         if (userData) {
//             res.status(200).send({ message: 'email already in use' });
//         } else {
//             const user_data = await user.save();
//             res.status(200).send({ message: 'User saved successfully', data: user_data });
//         }
//     } catch (error) {
//         console.log(error);

//         res.status(400).json({
//             success: false,
//             message: error.message,
//         });

//     }
// }

exports.SignUp = async (req, res) => {
    const password = req.body.password;
    const user = new User({
        email: req.body.email,
        password: password,
        mobileNumber:req.body.mobileNumber,
    })

    try {
        const userData = await User.findOne({ email: req.body.email })
        if (userData) {
            res.status(200).send({ message: 'email already in use' });
        } else {
            const user_data = await user.save();
            res.status(200).send({ message: 'User saved successfully', data: user_data });
        }

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}
/**
 * @method - GET
 * @param - /getAll
 * @description - User list
 */

exports.GetAll = (async (req, res) => {

    const { page } = req.query;

    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await User.countDocuments({});
        const users = await User.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

})

/**
 * @method - GET
 * @param - /getByID
 * @description - User GetById
 */

exports.GetById = (async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

/**
 * @method - DELETE
 * @param - /delete
 * @description - User Delete
 */

exports.deleteUser = (async (req, res) => {

    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const data = await User.findByIdAndDelete(id)
        // console.log(data);
        res.send(`User  has been deleted..`)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
})


exports.updateUser = (async (req, res) => {
    const { id } = req.params;
    const {  email, password , mobileNUmber} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedUser = {  mobileNUmber, email, password, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
})

