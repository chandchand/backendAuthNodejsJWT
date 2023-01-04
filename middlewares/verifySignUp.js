const db = require('../model');
const ROLES = db.ROLES
const User = db.user

checkDuplicatedName = (req, res, next) => {
    
    User.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err.message});
            return
        }
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
    })
}

checkRoleExisted = (req, res, next) => {
    const roles = req.body.roles
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])){
                res.status(400).send({ 
                    message: `Failed Role ${roles[i]} does not exist` 
                })
                return
            }
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicatedName,
    checkRoleExisted
}

module.exports = verifySignUp