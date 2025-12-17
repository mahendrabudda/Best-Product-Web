import userModel from '../useModel/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodeMailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
            success: false,
            message: 'missing details'
        })
    }

    try {

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

       const mailOptions = {
  from: `"BestPrice" <${process.env.SENDER_EMAIL}>`,
  to: email,
  subject: "Welcome to BestPrice",
  text: `Hi ${name}, your account is created successfully.`
};


       const info = await transporter.sendMail(mailOptions);
console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Response:", info.response);
  return res.json({ success: true });


    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
