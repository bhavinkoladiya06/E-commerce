const CATEGORY=require('../model/categoryModel')

exports.createCategory=async function (req,res,next) {
    try {
        req.body.image=req.file.filename
        const {categoryName,image}=req.body

        if(!categoryName||!image){
            throw new Error('please fillup all filds')
        }

        const data=await CATEGORY.create(req.body)
        res.status(201).json({
            Message:'category create',
            data
        })
    } catch (error) {
        res.status(404).json({
            status:'Fails',
          message:error.message
        });
    }
}

exports.getAllCategory=async function (req,res,next) {
    try {
        var data=await CATEGORY.find()
        if(!data){
            throw new Error('no category available')
        }

        res.status(200).json({
            message:'get all category',
            data
        })
    } catch (error) {
          res.status(200).json({
            message: error.message,
            status:'Fails'
          });
    }
}

exports.deleteCatogery= async function (req,res,next) {
    try {
        console.log(req.params.id);
        await CATEGORY.findByIdAndDelete({ _id: req.params.id });

        res.status(204).json({

        })

    } catch (error) {
        res.status(404).json({
            message:error.message,
            status:'Fail'
        });
    }
}
exports.updateCatogery= async function (req,res,next) {
    try {
        console.log(req.params.id);
        req.body.image=req.file.filename
      const data = await CATEGORY.findByIdAndUpdate(req.params.id,req.body );

        res.status(201).json({
            message:'data update successfull',
        })

    } catch (error) {
        res.status(404).json({
            message:error.message,
            status:'Fail'
        });
    }
}

