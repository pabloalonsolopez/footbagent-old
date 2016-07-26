import { Schema, model } from "mongoose"

const UserSchema = new Schema({
	name: String,
	username: String,
	password: String
})

const User = model('User', UserSchema)

export { User }