import { clerkClient } from "@clerk/express";
//Middleware to  check userid and has premium plan or free plan

export const auth = async (req, res, next)=>{
    try {
        const {userId, has} = await req.auth ();
        const hasPremiumPlan = await has ({plan: 'premium'});
        
        const user = await clerkClient.users.getUser(userId);

        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            req.free_usage = user.privateMetadata.free_usage
        }else{
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: 0
                }
            })
            req.free_usage = 0;
        }
        req.plan= hasPremiumPlan ? 'premium' : 'free'
        const currentPublicPlan = user.publicMetadata?.plan
if (currentPublicPlan !== req.plan) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { plan: req.plan }
  })
}
        next()
    } catch (error) {
        res.json({success: false, message: error.message})
    }

}