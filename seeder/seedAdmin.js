const User = require('../models/userModel');

module.exports = async () => {
    try {
        const admin = await User.findOne({ email: process.env.EMAIL });
        if (!admin) {
            const user = {
                firstname: process.env.FIRST_NAME,
                lastname: process.env.LAST_NAME,
                email: process.env.EMAIL,
                phone: process.env.PHONE,
                password: process.env.PASSWORD,
                role: 'admin',
                verified:'true'
            }

            await User.create(user)
            console.log('Admin Seeded')
        } else {
            console.log('admin exit')
        }
    } catch (error) {
        console.log(error)
    }
}