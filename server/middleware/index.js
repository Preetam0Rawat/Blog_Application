import jwt from 'jsonwebtoken'

const auth = async(req , res , next) =>{
    try{
                            console.log("Auth 1")
        const authHeader = req.header('Authorization')
                            console.log("Auth 2")
                            console.log("header ", authHeader)

        if(!authHeader || authHeader.split(' ')[1] === 'null'){
                            console.log("Auth 3")
            return res.status(401).json({mssg : "Token missing"})  //Unauthorized
        }

        // In jwt we don't use Basic bbut Bearer
        const token = authHeader.split(' ')[1]
                            console.log("Auth 4")
                            console.log("token", token)

        const isCustomAuth = token.length < 500
        let decodedData;
                            console.log("Auth 5")

        if(token && isCustomAuth){
                            console.log("Auth 6")
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
                            console.log("req,userId", req.userId)
        }else{
                             console.log("Auth 7")
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
                                console.log("Auth 8")
        }
                                console.log("Auth 9")
        next()

    }
    catch(error){
        console.log(error)
        res.status(403).json({mssg : "Error occured while authorization"})
    }

}

export default auth;