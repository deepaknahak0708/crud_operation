const Validators = require('./validation/index');

module.exports = (validator) =>{
    if(!Validators.hasOwnProperty(validator)){
        throw new Error(`${validator} validators is not exist`)
    }

    return async (req, res, next)=>{
        try {
            const validated = await Validators[validator].validateAsync(req.body);
            req.body = validated
            next()
        } catch (error) {
            if(error.isJoi){
                error.statusCode = 422
                next(error);
            }
        }
    }  
}