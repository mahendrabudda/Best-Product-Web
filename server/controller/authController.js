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

await transporter.verify();
console.log("SMTP READY");
       const info = await transporter.sendMail(mailOptions);
        return res.json({ success: true });



    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email and Password are Required'
        })
    }

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'invalid mail id'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'invalid password'
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })

        res.json({ success: true });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }

}

export const logout = async (req, res) => {
    try {
         res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        })

        return res.json({ success: true, message: 'logged out' })
    } catch (error) {

    }
}



export const sendVerifyOtp = async (req, res) => {
    try {

        const  userId  = req.user.id;
        
        const user = await userModel.findById(userId);

        if (user.isAccountverified) {
            return res.json({
                success: false,
                message: 'account Already Verified'
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 90000))

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification Otp',
            text: `Your otp is ${otp} . verfiy your account using this Otp `
        }
        await transporter.sendMail(mailOptions);

       return res.json({
            success: true,
            message: 'verifivation Otp sent on Email'
        })

    } catch (error) {
       return  res.json({
            success: false,
            message: error.message
        });
    }
}


export const verifyEmail = async (req, res) => {

    const userId = req.user.id;
    const { otp } = req.body;
    if (!userId || !otp) {
        return res.json({
            success: false,
            message: 'missing details'
        });
    }

    try {


        const user = await userModel.findById(userId);
        if (!user) {
           return res.json({
                success: false,
                message: 'user not found'
            });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({
                success: false,
                message: 'Invalid Otp'
            });
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "Otp Expired"
            });
        }

        user.isAccountverified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({
            success: true,
            message: 'Email Verified Successfully'
        })

    } catch (error) {
       return res.json({
            success: false,
            message: error.message
        })
    }

}

export const isAuthenticated = async (req, res) => {
    try {
       return res.json({
            success: true,
            message: "user logged in"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
       return res.json({
            success: false,
            message: "email is required"
        })

    }
    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "user not found"
            })
        }
        const otp = String(Math.floor(100000 + Math.random() * 90000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() +  15 * 60 * 1000
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification Otp',
            text: `Your otp for Resetting yout password is  ${otp} . use this otp for procedding to reset password`
        }
        await transporter.sendMail(mailOptions);
 
        return res.json({

            success:true,
            message:"otp sent successfully"
        })



    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const resetPassword = async(req , res) =>{
    const {email , otp , newPassword} = req.body;
    if(!email || !newPassword || !otp){
        return res.json({
            success:false,
            message:" Email , newPassword , otp are required"
        });

    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"user not found"
            });
        }

        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({
                success:false,
                message:"otp is invalid"
            });
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({
                success:false,
                message:"otp is Expired"

            });
        }

        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        
        await user.save();

        return res.json({
            success:true,
            message:"Password is Updated"
        })


    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        
        })
    }
}