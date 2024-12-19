import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import z from 'zod'
import { TodoModel, UserModel } from './models/Todos.model.js';
import connectDB from './Database/database.js';
import { jwtauthMiddleware, generatetoken } from './middlewares/jwtAuthMiddleware.js';

dotenv.config({
    path: "./.env"
})

const app = express();
app.use(express.json())

const PORT = process.env.PORT;
connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.post("/signup", async (req, res) => {
    try {
        const signupSchema = z.object({
            username: z.string().min(3, "Username must be at least 3 characters long"),
            email: z.string().email("Invalid email address").refine((email) => email.endsWith("@gmail.com")),
            password: z.string().min(8, "Password must be at least 8 characters long"),
        });

        const { username, email, password } = signupSchema.parse(req.body);

        const user = new UserModel({ username, email, password });
        const response = await user.save();

        console.log("response data saved ", response);


        const payload = {
            id: response._id,
            username: response.username
        };

        const token = generatetoken(payload);


        res.status(200).json({
            response,
            token,
            message: "Successfully signed up"
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: `Internal server error during sign-up ` });
    }
});


app.post("/signin", async (req, res) => {
    try {

        const signinSchema = z.object({
            email: z.string().email("Invalid email address").refine((email) => email.endsWith("@gmail.com")),
            password: z.string().min(8, "Password must be at least 8 characters long"),
        });

        const { email, password } = signinSchema.parse(req.body);

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }


        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid username or password" });
        }


        const payload = {
            id: user._id,
            username: user.username,
        };
        const token = generatetoken(payload);

        res.status(200).json({
            message: "Signin successful",
            token: token,
        });
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/todos", jwtauthMiddleware, async (req, res) => {
    const get_todos = await TodoModel.find();
    console.log(get_todos);

    if (get_todos) {
        res.status(200).json({
            get_todos
        })
    } else {
        console.error("Error during getting todoo:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

app.post("/todos", jwtauthMiddleware, async (req, res) => {
    try {
        const { title, done } = req.body;
        const data_todo = new TodoModel({ title, done });
        const savedtodo = await data_todo.save();

        res.status(200).json({
            savedtodo
        })


    } catch (error) {
        console.error("Error during posting todoo:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

app.put("/todos/:id", jwtauthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, done } = req.body;
        const update_todo = await TodoModel.findByIdAndUpdate(id, { title, done }, { new: true, runValidators: true });

        if (!update_todo) {
            res.status(403).json({ error: "not found  it " })
        }

        res.status(200).json({
            message: "Updated successfully",
            update_todo
        })

    } catch (error) {
        console.error("Error during updating todoo:", error);
        res.status(500).json({ error: "Error in Update" });
    }

});

app.delete("/todos/:id", jwtauthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const delete_todo = await TodoModel.findByIdAndDelete(id);

        if (!delete_todo) {
            res.status(403).json({ error: "not found  it " })
        }

        res.status(200).json({
            message: "Deleted successfully",
            delete_todo
        })

    } catch (error) {
        console.error("Error during deleting todoo:", error);
        res.status(500).json({ error: "Error in Delete" });
    }

});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
