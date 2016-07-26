import * as express from "express"
import { join } from "path"
import * as ejs from "ejs"
import * as favicon from "serve-favicon"
import { json, urlencoded } from "body-parser"
import { connect } from "mongoose"
import * as jwt from 'express-jwt'
import { DATABASE, SECRET } from "./config"

import "./models/user"
connect(DATABASE)

import { AuthRouter } from "./routes/auth"
import { IndexRouter } from "./routes/index"

const app: express.Application = express()
app.disable("x-powered-by")

app.set('views', join(__dirname, 'public'))
app.set('view engine', 'ejs')
app.engine('html', ejs.renderFile)
app.use(favicon(join(__dirname, "public", "favicon.ico")))
app.use(express.static(join(__dirname, 'public')))

app.use(json())
app.use(urlencoded({ extended: true }))

const jwtCheck = jwt({ secret: SECRET })
app.use('/api/auth/updateProfile', jwtCheck)
app.use('/api/auth/updatePassword', jwtCheck)
app.use('/api/secure', jwtCheck)

app.use("/api/auth", AuthRouter)
app.use('/*', IndexRouter)

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500)
        res.json({
            error: err,
            message: err.message
        })
    })
}

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500)
    res.json({
        error: {},
        message: err.message
    })
})

export { app }