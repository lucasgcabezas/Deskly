const joi = require('joi')
const validator = (req, res, next) => {
    const schema = joi.object({
        firstName:joi.string().trim().min(2).max(20).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty":"Este campo es obligatorio",
            "string.min":"Tu nombre debe contener al menos 2 letras",
            "string.max":"Tu nombre no puede contener más de 20 letras",
            "string.pattern.base":"Este campo solo puede contener letras"
        }),
        lastName:joi.string().trim().min(3).max(20).pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.min":"Tu apellido debe contener al menos 3 letras",
            "string.max":"Tu apellido no puede contener más de 20 letras",
            "string.pattern.base":"Este campo solo puede contener letras"
        }),
        email:joi.string().trim().email().required().messages({
            "string.email":"Introduzca una dirección de correo electrónico válida",
            "string.empty":"Este campo es obligatorio",
        }),
        password:joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty":"Este campo es obligatorio",
            "string.pattern.base": "Su contraseña debe tener al menos 6 caracteres, contener una letra mayúscula, una letra minuscula y un número",
            "string.min": "Su contraseña debe tener al menos 6 caracteres"
        }),
        img:joi.string().required().uri().messages({
            "string.uri": "Introduzca un URL válido",
            "string.empty":"Introduzca un URL válido"
        }),
        google: joi.boolean(),
        facebook: joi.boolean()
    })
    const validation = schema.validate(req.body, {abortEarly:false})
    if (validation.error) {
        return res.json({success: false, validationError: validation.error})
    }
    next()
}
module.exports = validator