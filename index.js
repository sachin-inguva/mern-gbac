const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const {
  userRouter,
  permissionRouter,
  groupRouter,
  signInRouter,
} = require("./routes");
const { requireAuth } = require("./middleware/requireAuth");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(helmet());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.get("/", (req, res) => res.send({ data: "hello!" }));

// router middleware
app.use("/", signInRouter);
app.use("/users", requireAuth, userRouter);
app.use("/groups", requireAuth, groupRouter);
app.use("/permissions", requireAuth, permissionRouter);

async function start() {
  try {
    await mongoose.connect("mongodb://localhost/rbac", {
      useNewUrlParser: true,
    });
    console.log("connected at mongodb://localhost/rbac");
    app.listen(PORT, () =>
      console.log(`App listening at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

//init
start();
