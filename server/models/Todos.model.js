import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const User = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Todo = mongoose.Schema({
    Userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: String,
    done: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

User.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next() 
})

User.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log("error in comparepassword", error)
    }
}

const UserModel = mongoose.model('UserModel', User);
const TodoModel = mongoose.model('TodoModel', Todo);

export { UserModel, TodoModel }