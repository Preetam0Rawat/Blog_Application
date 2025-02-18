import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'

export const auth = async(req , res , next) =>{
    try{
                            console.log("Auth 1")
        const authHeader = req.header('Authorization')
                            console.log("Auth 2")
                            console.log("header ", authHeader)

        if(!authHeader || authHeader.split(' ')[1] === 'null'){
                            console.log("Auth 3")
            return res.status(401).json({mssg : "You are unauthorized"})  //Unauthorized
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

export const editAndDeleteBlogAuth = async(req, res, next)=> {
    try {
                                console.log("Blog auth 1")
        const {id} = req.params; // Blog ID
        const blog = await Blog.findById(id);

        if (blog.author.toString() !== req.userId) {
            return res.status(403).json({ mssg: "Unauthorized: You can only edit n delete your own blog" });
        }
                                console.log("Blog auth 2 and on to next")
        next(); // Proceed to update if authorized
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}