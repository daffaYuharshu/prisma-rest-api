const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const noteRouter = require("./routes/noteRouter");

const app = express();
const port = 3000;
const prisma = new PrismaClient();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("hello world");
})

app.use("/notes", noteRouter);

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})