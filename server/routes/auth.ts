import { Router } from 'express'
import { model } from 'mongoose'
import { sign, decode }  from 'jsonwebtoken'
import { omit } from 'lodash'
import { SECRET, SECRET_EXP } from '../config'

const extend = require('util')._extend

const AuthRouter: Router = Router()

const User = model('User')

AuthRouter.post('/signup', function(req, res, next) {
	User.findOne({'username': req.body.username}, function(err, user) {
		if (err) return next(err)
		if (user) {
        	let err = new Error()
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
            if (user.get('password') === req.body.password) {
                res.json({ data: { id_token: sign(omit(user.toObject(), ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
            } else {
                let err = new Error('password')
                next(err)
            }
        } else {
            let err = new Error('username')
            next(err)
        }
    })
})

AuthRouter.post('/updateprofile', function(req, res, next) {
    let decodedToken = decode(req.headers['authorization'].split(' ')[1])
    User.findOne({'username': req.body.username, '_id': {'$ne': decodedToken._id }}, function(err, user) {
        if (err) return next(err)
        if (user) {
            let err = new Error()
            next(err)
        } else {
            User.findById(decodedToken._id, function(err, user) {
                if (err) return next(err)
                user = extend(user, req.body)
                user.save(function(err) {
                    if (err) return next(err)
                    res.json({ data: { id_token: sign(omit(user.toObject(), ['password']), SECRET, { expiresIn: SECRET_EXP }) } })
                })
            })
        }
    })
})

AuthRouter.post('/updatepassword', function(req, res, next) {
    let decodedToken = decode(req.headers['authorization'].split(' ')[1])
    User.findById(decodedToken._id, function(err, user) {
        if (err) return next(err)
        if (user.get("password") != req.body.currentpassword) {
            let err = new Error()
            next(err)
        } else {
            user.set("password", req.body.newpassword)
            user.save(function(err) {
                if (err) return next(err)
            })
            res.json({ data: user })
        }
    })
})

export { AuthRouter }