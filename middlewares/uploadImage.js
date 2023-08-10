require("dotenv").config();

const AWS = require("aws-sdk");
const sharp = require("sharp");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const uploadImages = (req, res, next) => {
  try {
    const imagePaths = [];
    // "Location": "https://darzi-app.s3-ap-southeast-2.amazonaws.com/customers/1678291998840",
    console.log(req.files?.length);
    if (req.files && req.files.length > 0) {
      const images = req.files?.map((file) => {
        return { ...file };
      });

      images.forEach(async (element) => {
        let compressedImage = await sharp(element.buffer)
          .resize({ width: 800 })
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toBuffer();

        const upload = {
          Bucket: "darziapp",
          Key: `customers/${element.originalname}`,
          Body: compressedImage,
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
            if (imagePaths?.length === images.length) {
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
    console.log('error at uploadImage', error)
    res.status(500).json({
      message: `${error}`,
    });
  }
};

module.exports = {
  uploadImages,
};
