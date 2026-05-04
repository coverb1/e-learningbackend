import { clerkClient, getAuth } from "@clerk/express";

//Middleware (protect Educator Routes)
export const protectEducator=async(req,res,next)=>{
try {
    const {userId}=getAuth(req)
    // console.log(userId)
    const responce=await clerkClient.users.getUser(userId)

    if (responce.publicMetadata.role!=='educator') {
        return res.json(({success:false ,message:"Unathorised Access"}))
    }
    next()

} catch (error) {
    res.json({success:false,message:error.message})
}
}