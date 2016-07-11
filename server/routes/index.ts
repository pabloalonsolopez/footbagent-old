import { Router } from "express"

const IndexRouter: Router = Router()

IndexRouter.get('/', function(req, res, next) {
	res.render('index.html')
})

export { IndexRouter }