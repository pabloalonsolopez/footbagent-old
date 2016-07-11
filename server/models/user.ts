import { Schema, model } from "mongoose"

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String
})

const User = model('User', UserSchema)

export { User }