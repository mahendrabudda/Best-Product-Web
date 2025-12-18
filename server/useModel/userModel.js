import mongoose from "mongoose";

const userInfo = new mongoose.Schema({
  // ================= AUTH =================
  name: {
    type: String,
    required: true,
   
  },

  email: {
    type: String,
    required: true,
    unique: true,
   
  },

  password: {
    type: String,
    required: true,
   
   
  },

  isAccountVerified: {
    type: Boolean,
    default: false
  },

  verifyOtp: {type:String , default:""},
  verifyOtpExpire: {type: Number , default:0},

  resetOtp: {type:String , default:""},
  resetOtpExpire:{type: Number , default:0},

  

  // ================= URL HISTORY =================
  checkedUrls: [
    {
      url: {type: String , default:""},
      platform: {type: String , default:""},
      price: {type: Number , default:0},
      checkedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // ================= CART =================
  cart: [
    {
      productName: {type: String , default:""},
      platform: {type: String , default:""},
      price: {type: Number , default:0},
      productUrl: {type: String , default:""},
      image: {type: String , default:""},
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

}, { timestamps: true });

export default mongoose.model("User", userInfo);
