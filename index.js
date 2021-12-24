const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const { signInRouter } = require("./routes/signInSignOut");
const { userRouter } = require("./routes/user");
const { groupRouter } = require("./routes/group");
const { permissionRouter } = require("./routes/permission");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
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
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/permissions", permissionRouter);

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
