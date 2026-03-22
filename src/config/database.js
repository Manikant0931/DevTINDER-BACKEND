const mongoose=require("mongoose");

// not a good way to connect:-(we are copying connection string from mongodb database)
// mongoose.connect(
//     "mongodb+srv://NamasteDev:sYYgIhUzVmHzDX3Q@namastenode.esecg3t.mongodb.net/"
// );

// best way:
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected"); 
};
module.exports = connectDB;


