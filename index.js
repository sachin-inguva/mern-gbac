const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => res.send({ data: "hello!" }));

// init
mongoose
  .connect("mongodb://localhost/rbac", { useNewUrlParser: true })
  .then(() => {
    console.log(`connected at mongodb://localhost/rbac`);
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("connection error:", err));
