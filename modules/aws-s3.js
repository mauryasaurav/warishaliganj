import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
  secretAccessKey: "Rt15fcFli+dTa83u5WUw+dWnOjCHNrEjJfYCwB8U",
  accessKeyId: "AKIAQ643KUDSAN3VJI44",
  region: "eu-north-1",
});

var s3 = new aws.S3();

//console.log(" data :",config.S3_AccessKey);
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "chorbucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    LocationConstraint: multerS3.AWS_DEFAULT_REGION,
    acl: "private",
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: function (req, file, cb) {
      // console.log("Original Image :", file.originalname);
      cb(null, "Uploads/" + Date.now() + "/" + file.originalname);
    },
  }),
});

export const uploadFile = async (req, res, next) => {
  await upload.fields([
    {
      name: "uploadFile",
      maxCount: 5,
    },
  ])(req, res, (err, some) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
        response: null,
      });
    }
    next();
  });
};

export const uploadAdminFile = async (req, res, next) => {
  await upload.fields([
    {
      name: "uploadAdminFile",
      maxCount: 5,
    },
    {
      name: "uploadUserFile",
      maxCount: 5,
    },
  ])(req, res, (err, some) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
        response: null,
      });
    }
    next();
  });
};

export const uploadSubAdminPic = async (req, res, next) => {
  await upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ])(req, res, (err, some) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
        response: null,
      });
    }
    next();
  });
};
