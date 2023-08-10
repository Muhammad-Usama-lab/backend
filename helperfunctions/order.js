require("dotenv").config();

const AWS = require("aws-sdk");
const sharp = require("sharp");

/*
products = [{
    title: 'Pista Ice cream',
    sku: '64120efbe4a75582ef49544b',
    _id: '64120efbe4a75582ef49544b',
    attachments: [ [Object] ],
    quantity: 1
  }
]




*/

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

const uploadImageToS3 = (data) => {
  try {
    let { product, attachments } = data;
    let s3Images = [];
    attachments?.forEach(async (element) => {
        console.log("element",element?.path);
    //   const matches = element.path.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    //   const base64Data = matches[2];
      const buffer = Buffer.from(element.path, "base64");

      let compressedImage = await sharp(buffer)
        .resize({ width: 800 })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

      const upload = {
        Bucket: "darziapp",
        Key: `customers/${product}_${new Date().getTime()}`,
        Body: compressedImage,
        // ContentType: element.mimetype,
        ACL: "public-read",
      };

      s3.upload(upload, (err, success) => {
        if (err) {
          const error = new Error(err);
          error.statusCode = 500;
          throw error;
        } else {
          s3Images.push(success?.key);
          if (attachments.length === s3Images.length) {
            return s3Images
          }
        }
      });
    // return ""
    });
  } catch (error) {
    console.log("Error from uploading to s3 function",error)
    throw error;
  }
};


module.exports={uploadImageToS3}