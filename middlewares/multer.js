const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/uploads')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split(".").pop();

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
    }
});

module.exports = multer({ storage: storage })