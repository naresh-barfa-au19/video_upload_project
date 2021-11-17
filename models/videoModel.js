const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required : true
  },
  discription :{
      type : String,
  },
  url : {
      type : String,
      required : true
  },
  secure_url : {
    type : String,
    required : true
},
  
  cloudinary_id: {
    type: String,
  },
  created_at:{
    type:String
  }
});

module.exports = mongoose.model("VideoModel", videoSchema);