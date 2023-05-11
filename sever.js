require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const PORT = process.env.PORT || 4000;

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/img", express.static(path.join(__dirname, "Photo/img")));

// => Routes
app.use("/", require("./routes/root"));

app.use("/users", require("./routes/userRoutes"));

app.use("/shoes", require("./routes/shoesRoutes"));

app.use("/stories", require("./routes/storiesRoutes"));

app.use("/order", require("./routes/Order_dataRoutes"));

app.use("/checkout", require("./routes/Check_outRoutes"));

app.listen(PORT, () => console.log(`Server running on ${PORT} 🔥🔥🚀🚀`));
