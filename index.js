const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

//const cors = require("cors");


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

/*
app.use(cors(
    {
        origin: ['https://blogsite-i1du.onrender.com']
    }
));
*/


mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to mongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images")
    }, filename:(req,file,cb) => {
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});