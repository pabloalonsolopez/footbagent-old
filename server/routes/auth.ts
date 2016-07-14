import { Router } from "express"
import { model } from "mongoose"
import { sign }  from "jsonwebtoken"
import { omit } from "lodash"
import { SECRET, SECRET_EXP } from "../config"

const AuthRouter: Router = Router()

const User = model('User')

AuthRouter.post('/signup', function(req, res, next) {
	User.findOne({'username': req.body.username}, function(err, user) {
		if (err) return next(err)
		if (user) {
        	let err = new Error("A user with the email entered already exists")
            next(err)
    	} else {
    		User.create(req.body, function(err, user) {
				if (err) return next(err)
                res.json({ data: { id_token: sign(omit(user.toObject(), ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
			})
    	}
	})
})

AuthRouter.post('/login', function(req, res, next) {
    User.findOne({'username': req.body.username}, function(err, user) {
        if (err) return next(err)
        if (user) {
            if (user.get("password") === req.body.password) {
                res.json({ data: { id_token: sign(omit(user.toObject(), ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
            } else {
                let err = new Error("The email and password entered don't match")
                next(err)
            }
        } else {
            let err = new Error("The email entered is not recognized")
            next(err)
        }
    })
})

export { AuthRouter }