import mongoose from "mongoose";

// local connection with localdb
const conn = mongoose.connect("mongodb://127.0.0.1:27017/crud-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// For local
//  const conn = mongoose.connect('mongodb://ChorbPeUsrU:ChorES!ed1aVOU@16.16.39.223:27017/chorapp_db', { useNewUrlParser: true, useUnifiedTopology: true })

conn
  .then(() => {
    console.log(`Mongodb connected successfully.`);
  })
  .catch((err) => {
    console.log("Error");
    console.log(err);
  });

exports.mongoose = mongoose;
exports.conn = conn;
