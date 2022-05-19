module.exports = app => {
  const product = require("../controllers/product.controller.js");

  var router = require("express").Router();

  router.post("/create", product.create);
  router.post("/update/:id", product.update);
  router.get("/getByProduct/:id", product.getByProduct);
  router.post("/delete", product.delete);
  router.post("/imageUpload/:id", product.import);
  router.get("/list", product.list);





  app.use('/api/product/', router);
};