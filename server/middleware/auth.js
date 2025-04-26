const JWT = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  try {
    const deCode = JWT.verify(req.headers.authorization, process.env.SECRET_KEY);
    req.user = deCode
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized Request")
  }
};

const isAdmin = async(req,res,next)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                status:false,
                message:"Unauthorized Request"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {verifyToken, isAdmin}
