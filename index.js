import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import indexRoute from "./routes/index";
import errorHandler from "./validation/validationErrorHandler";

require("./config/db");

var app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api", indexRoute);

//  handle Error
app.use(errorHandler.handleError());

app.use(express.static(path.join(__dirname, "./")));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,PUT,POST,PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

app.listen(port);

console.log("server running on port ", +port);
