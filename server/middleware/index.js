import jwt from 'jsonwebtoken'

const auth = async(req , res , next) =>{
    try{
        const authHeader = req.header('Authorization')
        if(!authHeader){
            return res.status(401)  //Unauthorized
        }

        // In jwt we don't use Basic bbut Bearer
        const token = authHeader.split(' ')[1]

        const isCustomAuth = token.length < 500
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()

    }
    catch(error){
        console.log(error)
    }

}

export default auth;