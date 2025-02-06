import jwt from 'jsonwebtoken'


const isAuthenticated = async (req,res,next)=>{
    try {
        const token =  req.headers.authorization.split(" ")[1]
        console.log(token,"Token")
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode,"decode")
        if(!decode){
            return res.status(401).json({
                message:'Invalid token',
                success:false
            });
        }
        req.id = decode.userId
        console.log(req.id,"reqId")
        next();
    } catch (error) {
        console.log(error,'middleware error')
    }
}

export default isAuthenticated