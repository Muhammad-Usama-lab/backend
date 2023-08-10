const { verify } = require("jsonwebtoken");

module.exports = {
  verify_token: (req, res, next) => {
    var token = req.get("authorization");
    if (token) {
      token = token.slice(4);
      verify(token, process.env.KEY, (err, decoded) => {
        req.userid = decoded?.results;
        err ? res.json({ success: 0, message: "Token expired" }) : next();
      });
    } else {
      res.json({
        success: 0,
        message: "Un authorize user",
      });
    }
  },
};