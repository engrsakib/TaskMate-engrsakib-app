require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const app = express();
const port = process.env.PORT || 5000;

// --- Configuration ---
// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.vnqi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://engrsakib-blood-donations-project.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "Unauthorized token" });
  }
  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

// --- Models ---
// Database operations for User and Task
const Models = {
  User: {
    async findByEmail(email) {
      const TaskMateUser = client.db("TaskMate").collection("users");
      return await TaskMateUser.findOne({ email });
    },
    async create(user) {
      const TaskMateUser = client.db("TaskMate").collection("users");
      const query = { email: user.email };
      const existingUser = await TaskMateUser.findOne(query);
      if (existingUser) {
        throw new Error("User already exists");
      }
      return await TaskMateUser.insertOne(user);
    },
  },
  Task: {
    async findByEmail(email) {
      const TasMateTasks = client.db("TaskMate").collection("task");
      return await TasMateTasks.find({ email }).toArray();
    },
    async findById(id) {
      const TasMateTasks = client.db("TaskMate").collection("task");
      return await TasMateTasks.findOne({ _id: new ObjectId(id) });
    },
    async create(task) {
      const TasMateTasks = client.db("TaskMate").collection("task");
      return await TasMateTasks.insertOne(task);
    },
    async deleteById(id) {
      const TasMateTasks = client.db("TaskMate").collection("task");
      return await TasMateTasks.deleteOne({ _id: new ObjectId(id) });
    },
  },
};

// --- Controllers ---
// Authentication-related logic
const AuthController = {
  async login(req, res) {
    try {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SEC, { expiresIn: "1h" });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  async logout(req, res) {
    try {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

// User-related logic
const UserController = {
  async getUserByEmail(req, res) {
    try {
      const email = req.params.mail;
      const user = await Models.User.findByEmail(email);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  async createUser(req, res) {
    try {
      const user = req.body;
      const result = await Models.User.create(user);
      res.status(200).send(result);
    } catch (error) {
      if (error.message === "User already exists") {
        return res.status(409).send({ message: error.message });
      }
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

// Task-related logic
const TaskController = {
  async getTasksByEmail(req, res) {
    try {
      const email = req.params.email;
      const tasks = await Models.Task.findByEmail(email);
      if (!tasks || tasks.length === 0) {
        return res.status(404).send({ message: "Tasks not found" });
      }
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  async getTaskById(req, res) {
    try {
      const id = req.params.id;
      const task = await Models.Task.findById(id);
      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  async createTask(req, res) {
    try {
      const task = req.body;
      const result = await Models.Task.create(task);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
  async deleteTask(req, res) {
    try {
      const id = req.params.id;
      const result = await Models.Task.deleteById(id);
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  },
};

// --- Routes ---
// Authentication routes
app.post("/jwt", AuthController.login);
app.post("/logout", AuthController.logout);

// User routes
app.get("/user/login/:mail", UserController.getUserByEmail);
app.post("/users", UserController.createUser);

// Task routes
app.get("/tasks/:email", verifyToken, TaskController.getTasksByEmail);
app.get("/task/:id", verifyToken, TaskController.getTaskById);
app.post("/add/task", verifyToken, TaskController.createTask);
app.delete("/delete/task/:id", verifyToken, TaskController.deleteTask);

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("TaskMate server is running");
});

// --- Start Server ---
async function startServer() {
  try {
    // Connect to MongoDB
    // await client.connect();
    // console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`TaskMate is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();