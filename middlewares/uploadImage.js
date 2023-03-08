require("dotenv").config();

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
const uploadImages = (req, res, next) => {
  try {
    // "Location": "https://darzi-app.s3-ap-southeast-2.amazonaws.com/customers/1678291998840",

    if (req.files && req.files.length > 0) {
      const images = req.files?.map((file) => {
        return { ...file };
      });

      const imagePaths = [];
      images.forEach(async (element) => {
        const upload = {
          Bucket: "darzi-app",
          Key: `customers/${new Date().getTime()}`,
          Body: element?.buffer,
          ContentType: element.mimetype,
          ACL: "public-read",
        };

        s3.upload(upload, (err, success) => {
          if (err) {
            const error = new Error(err);
            error.statusCode = 500;
            throw error;
          } else {
            imagePaths.push(success?.key);
            if (imagePaths.length === images.length) {
              req.images = imagePaths;
              next();
            }
          }
        });
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: `${error}`,
    });
  }
};

module.exports = {
  uploadImages,
};
