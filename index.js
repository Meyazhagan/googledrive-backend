require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");

const mongooseConnect = require("./shared/mongoose");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const fileRouter = require("./routes/files.routes");
const folderRouter = require("./routes/folders.routes");

const authUser = require("./middleware/authUser");
const errors = require("./middleware/errors");

mongooseConnect();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/files", authUser, fileRouter);
app.use("/api/folders", authUser, folderRouter);

app.get("/api/verify-token", authUser, (req, res, next) => {
    res.send({ message: "Verified token" });
});
app.use(errors);

// app.use((req, res) => res.send({ message: "there is no endpoint" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening to Port - ${PORT}`));
