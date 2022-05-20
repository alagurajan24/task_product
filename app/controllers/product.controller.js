const { product } = require("../models");
const db = require("../models");
const multer = require('multer');
const Product = db.product;
var status = 'failed';
var message = '';
var data = [];


exports.create = (req, res) => {
    Product.findOne({ productName: req.body.productName }, function (err, product) {
        if (err) return res.status(500).send({
            status: "failed",
            message: 'Something went wrong',
            data: data
        });
        if (product) return res.status(500).send({
            status: "failed",
            message: 'productName already placed',
            data: data
        });

        Product.findOne({ productCode: req.body.productCode }, function (err, product) {
            if (err) return res.status(500).send({
                status: "failed",
                message: 'Something went wrong',
                data: data
            });
            if (product) return res.status(500).send({
                status: "failed",
                message: 'productCode already placed',
                data: data
            });

            Product.create({
                productName: req.body.productName,
                productCode: req.body.productCode,
                dosageForm: req.body.dosageForm,
                packingForm: req.body.packingForm,
                packingDisplay: req.body.packingDisplay,
                packingSize: req.body.packingSize,
                weight: req.body.weight,
                care: req.body.care,
                salt: req.body.salt,
                saltGroup: req.body.saltGroup,
                speciality: req.body.speciality,
                manufacturer: req.body.manufacturer,
                mrp: req.body.mrp,
                priceToCust: req.body.priceToCust,
                discountMrp: req.body.discountMrp,
                taxPercnt: req.body.taxPercnt,
                condition: req.body.condition,
                homeCategory: req.body.homeCategory,
                hsn: req.body.hsn,
                country: req.body.country,
                strength: req.body.strength,
                stock: req.body.stock,
                stockType: req.body.stockType,
                reason: req.body.reason,
                prescriptReq: req.body.prescriptReq,
                pap: req.body.pap,
                papOffer: req.body.papOffer,
                abcd: req.body.abcd,
                seoTitle: req.body.seoTitle,
                keywords: req.body.keywords,
                description: req.body.description
            },
                function (err, user) {
                    if (err) return res.status(500).send({
                        status: "failed",
                        message: 'Something went wrong',
                        data: err
                    })

                    res.status(200).send({
                        status: 'success',
                        message: 'Product Created successfully',
                        data: user
                    });
                });
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Product.findOne({ productName: req.body.productName, _id: { $ne: id } }, function (err, product) {
        if (err) return res.status(500).send({
            status: status,
            message: 'Something went wrong',
            data: data
        });
        if (product) return res.status(500).send({
            status: status,
            message: 'productName already exist',
            data: data
        });

        Product.findOne({ productCode: req.body.productCode, _id: { $ne: id } }, function (err, product) {
            if (err) return res.status(500).send({
                status: status,
                message: 'Something went wrong',
                data: data
            });
            if (product) return res.status(500).send({
                status: status,
                message: 'productCode already exist',
                data: data
            });

            var body = {
                productName: req.body.productName,
                productCode: req.body.productCode,
                dosageForm: req.body.dosageForm,
                packingForm: req.body.packingForm,
                packingDisplay: req.body.packingDisplay,
                packingSize: req.body.packingSize,
                weight: req.body.weight,
                care: req.body.care,
                salt: req.body.salt,
                saltGroup: req.body.saltGroup,
                speciality: req.body.speciality,
                manufacturer: req.body.manufacturer,
                mrp: req.body.mrp,
                priceToCust: req.body.priceToCust,
                discountMrp: req.body.discountMrp,
                taxPercnt: req.body.taxPercnt,
                condition: req.body.condition,
                homeCategory: req.body.homeCategory,
                hsn: req.body.hsn,
                country: req.body.country,
                strength: req.body.strength,
                stock: req.body.stock,
                stockType: req.body.stockType,
                reason: req.body.reason,
                prescriptReq: req.body.prescriptReq,
                pap: req.body.pap,
                papOffer: req.body.papOffer,
                abcd: req.body.abcd,
                seoTitle: req.body.seoTitle,
                keywords: req.body.keywords,
                description: req.body.description
            };

            Product.findByIdAndUpdate(id, body, { useFindAndModify: false })
                .then(product => {
                    if (!product) {
                        res.status(404).send({
                            status: status,
                            message: 'Maybe product was not found',
                            data: data
                        });
                    } else {
                        status = "success";
                        res.send({
                            status: status,
                            message: 'product updated successfully',
                            data: product
                        });
                    }
                })
        });
    });
};

exports.getByProduct = (req, res) => {

    const id = req.params.id;

    Product.findById({ _id: id }, function (err, product) {
        if (err) return res.status(500).send({
            status: status,
            message: 'Something went wrong',
            data: data
        });

        Product.findById({ _id: id }).exec((err, product) => {
            res.send({
                status: 'success',
                message: 'Product listed successfully',
                data: product
            });
        });
    });
}

exports.delete = (req, res) => {
    var newvalues = { $set: { status: 2 } };
    Product.updateOne({ _id: req.body.id }, newvalues, function (err, product) {
        if (err) return res.status(500).send({
            status: status,
            message: 'Something went wrong',
            data: data
        });
        status = "success";
        res.send({
            status: status,
            message: 'Product deleted successfully',
            data: data
        });
    });
}

exports.import = (req, res) => {
    const id = req.params.id;

    var upload = multer({ storage: storage }).array("product_image");
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        var files = [];
        for (var i = 0; i < req.files.length; i++) {
            files = req.files[i].path;


            // update image path in document by Id
            var newvalues = { $set: { productimages: files } };
            Product.updateMany({ _id: id }, newvalues, function (err, data) {
                if (err) return res.status(500).send({
                    status: "failure",
                    message: 'Something went wrong',
                    data: data
                });
            });
        }
        res.send(files);
    });
};

var path = "C:/Node/task_product/uploads/"
global.__basedir = __dirname;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});


// search record 
exports.list = (req, res) => {
    try {
        var search = req.query.search;
        if (search != undefined && search != '') {
            //exact match
            Product.find({ $and: [{ $or: [{ productName: { $regex: `^${search}`, $options: 'i' } }, { productCode: { $regex: `^${search}`, $options: 'i' } }] }, { status: { $ne: 2 } }] }, (err, product) => {
                if (err) {
                    responseObj = {
                        status: "error",
                        message: 'Something went wrong',
                        data: err
                    }
                    res.status(500).send(responseObj);
                } else {
                    responseObj = {
                        status: "success",
                        message: 'Product record found.',
                        data: product
                    }
                    res.status(200).send(responseObj);
                }
            })
        } else {
            Product.find({ status: { $ne: 2 } }).exec((err, docs) => {
                res.send({
                    status: 'success',
                    message: 'Product listed successfully',
                    data: docs
                });
            });
        }
    } catch (error) {
        console.log('Error::', error);
    }
}

