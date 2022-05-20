module.exports = app => {
    const excel = require("../controllers/excel.controller.js");
    var router = require("express").Router();
    var path = "C:/Node/task_product/product_uploads/"

    const multer = require('multer');
    global.__basedir = __dirname;
    // -> Multer Upload Storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
        }
    });
    const upload = multer({ storage: storage });

    router.post("/excelimport", [upload.single("excelupload")], excel.import);
    router.get("/download", excel.download);

  app.use('/api/product/', router);
};