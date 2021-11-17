const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("./utils/cloudinary.js");
const upload = require("./utils/multer.js");
const VideoModel = require("./models/videoModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.post("/upload_video", upload.single("video"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      overwrite: true,
    });
    if (!result) console.log("Some err ");
    console.log(result);
    let sendData = new VideoModel({
      title: req.body.title,
      discription: req.body.discription,
      url: result.url,
      secure_url: result.secure_url,
      created_at: result.created_at,
      cloudinary_id: result.public_id,
    });
    await sendData.save();
    res.json(sendData);
  } catch (error) {
    console.log(error);
  }
});

app.get("/upload_video", async (req, res) => {
  try {
    let user = await VideoModel.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    let user = await VideoModel.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => console.log("Server is running on 5000"));
