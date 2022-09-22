const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



// Registration user---------------------
exports.registration = async (req, res) => {
    try {
        const user = new User();
        // const password = req.body.password;          
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname
        user.phone = req.body.phone
        user.email = req.body.email
        user.password = req.body.password

        const userData = await user.save()
        res.status(200).json({
            success: true,
            data: userData,
            message: 'User Register Successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: "Can not register user"
        })
    }
}



// login user----------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(422).json({
                success: false,
                message: 'Email is invalid'
            })
        }

        if (user.password !== password) {
            res.status(422).json({
                success: false,
                message: 'Password is invalid'
            })
        }

        const token = jwt.sign({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: user.role
        }, process.env.SECRETE, { expiresIn: '12h' });

        return res.status(200).json({
            success: true,
            data: token,
            message: 'User Sign in successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Not able to Sign in Some error occurs'
        })
    }
}