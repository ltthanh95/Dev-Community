const express=require('express');
const request=require('request')
const config= require('config')
const router=express.Router();
const {check,validationResult}=require('express-validator')
const Profile=require('../../models/Profile')
const User=require("../../models/User")
const Post=require("../../models/post")
const auth=require("../../middleware/auth")

router.get('/me',auth,async(req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({msg:'there is no profile for this user'})
        }
        res.json(profile)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skill is required').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {company,website,location,bio,status,github,skills,youtube,facebook,twitter,instagram,linkedin}=req.body

    //Build profile obj
    const profileField={};
    profileField.user=req.user.id;
    if(company) profileField.company=company
    if(website) profileField.website=website
    if(location) profileField.location=location
    if(bio) profileField.bio=bio
    if(status) profileField.status=status
    if(github) profileField.github=github
    if(skills){
        profileField.skills=skills.split(',').map(skill=>skill.trim());
    }
   
    //build social obj
    profileField.social={}
    if(youtube) profileField.social.youtube=youtube
    if(twitter) profileField.social.twitter=twitter
    if(facebook) profileField.social.facebook=facebook
    if(linkedin) profileField.social.linkedin=linkedin
    if(instagram) profileField.social.instagram=instagram
    
    try{
        let profile=await Profile.findOne({user:req.user.id})
        if(profile){
            
            profile=await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileField},
                {new:true});
            console.log(profile)
            return res.json(profile)
        }
        //Create
       else{
     
        profile=new Profile(profileField);
        await profile.save();
        res.json({profile})
       }
        
       
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

    
})


router.get('/',async (req,res)=>{
    try {
        const profiles=await Profile.find().populate('user',['name','avatar'])
        res.status(200).json({profiles})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


router.get('/user/:user_id',async (req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar'])
        if(!profile) return res.status(400).json({msg:"Profile not Found"})
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if(err.kind==='ObjectId') return res.status(400).json({msg:"Profile not Found"})
        res.status(500).send('Server Error')
    }
})

router.delete('/',auth,async (req,res)=>{
    try {
        //Remove User posts
        await Post.deleteMany({user:req.user.id})

        //Remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        //Remove User
        await User.findOneAndRemove({_id:req.user.id})
        res.json({msg:"User deleted"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})
//experience
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty(),

]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {title,company,location,from,to,current,description}=req.body
    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile=await Profile.findOne({user:req.user.id})
        if(to<from){
            return res.status(400).json({msg:"INVALID DATE"})
        }
        else{
            profile.experience.unshift(newExp) //push new item on top of array
            profile.save();
            res.json(profile)
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id})

        //Get remove index
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id); //get the position of exp_id in array
        profile.experience.splice(removeIndex,1)//replace element at index 1
        await profile.save();
        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


//education
router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field Of Study is required').not().isEmpty(),
    check('from','From Date is required').not().isEmpty(),

]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description}=req.body
    const newEdu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile=await Profile.findOne({user:req.user.id})
        profile.education.unshift(newEdu) //push new item on top of array
        profile.save();
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})


router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id})

        //Get remove index
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id); //get the position of edu_id in array
        profile.education.splice(removeIndex,1)//replace element at index 1
        await profile.save();
        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

router.get("/github/:username",(req,res)=>{ 
    try{
        const options={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
           

           if(response.statusCode===403){
               res.status(403).json({msg:'GitHub exceeded limit rate'})
           }
           else{
                if(error){
                    res.status(404).json({msg:'No Github Profile Found'});
                    console.error(error);
                } 
                res.json(JSON.parse(body));
           }
           
        })

    }
    catch(error){
        console.error(error.message)
        res.status(500).send('Server Error');
    }
})



module.exports=router;