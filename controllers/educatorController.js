import {clerkClient} from '@clerk/express'

// update role to educator
export const updateRoleToEducator=async(req,res)=>{
    try {
        const { userId } = req.auth()
        console.log(userId)
        // this means go to the  and update or add role to educator
        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role:'educator'
            }
        })
        res.json({success:true, message:'you can publish course now'})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//  a person joins LMS by default is a STudent and after while user can become instructor
