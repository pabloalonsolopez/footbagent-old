import * as express from "express"
import { join } from "path"
import * as favicon from "serve-favicon"
import { json, urlencoded } from "body-parser"

import { connect } from "mongoose"
import { DATABASE } from "./config"
import "./models/user"
connect(DATABASE)

import { AuthRouter } from "./routes/auth"

const app: express.Application = express()
app.disable("x-powered-by")

app.use(favicon(join(__dirname, "public", "favicon.ico")))
app.use(express.static(join(__dirname, 'public')))

app.use(json())
app.use(urlencoded({ extended: true }))

app.use("/api/auth", AuthRouter)

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found")
    next(err)
})

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