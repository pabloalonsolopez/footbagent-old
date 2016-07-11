import { Router } from "express"
import { model } from "mongoose"
import { omit } from "lodash"
import { sign }  from "jsonwebtoken"
import { SECRET, SECRET_EXP } from "../config"

const AuthRouter: Router = Router()

const User = model('User')

AuthRouter.post('/signup', function(req, res, next) {
	User.findOne({'username': req.body.username}, function(err, user) {
		if (err) return next(err)
		if (user) {
        	let err = new Error("A user with that email address already exists.")
    		next(err)
    	} else {
    		User.create(req.body, function(err, user) {
				if (err) return next(err)
                res.json({ data: { id_token: sign(omit(user, ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
			})
    	}
	})
})

AuthRouter.post('/login', function(req, res, next) {
    User.findOne({'username': req.body.username, 'password': req.body.password}, function(err, user) {
		if (err) return next(err)
		if (user) {
        	res.json({ data: { id_token: sign(omit(user, ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
    	} else {
            let err = new Error("There was a problem with you login.")
    		next(err)
    	}
	})
})

export { AuthRouter }