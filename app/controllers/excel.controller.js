const db = require("../models");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const Product = db.product;
var status = 'failed';
var message = '';
var data = [];
global.__basedir = __dirname;
var path = "C:/Node/task_product/product_uploads/"

exports.import = (req, res) => {
    importExcel(path + req.file.filename);
    status = "success";
    res.json({
        'status': status,
        'message': 'File uploaded/import successfully!',
        'data': []
    });
};

function importExcel(filePath) {
    console.log(filePath);
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{
            name: 'Sheet1',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'S.No',
                B: 'productName',
                C: 'productCode',
                D: 'strength',
                E: 'dosageForm',
                F: 'packingForm',
                G: 'packingDisplay',
                H: 'packingSize',
                I: 'weight',
                J: 'care',
                K: 'salt',
                L: 'saltGroup',
                M: 'speciality',
                N: 'condition',
                O: 'manufacturer',
                P: 'mrp',
                Q: 'priceToCust',
                R: 'taxPercnt',
                S: 'prescriptReq',
                T: 'pap',
                U: 'papOffer',
                V: 'country',
                W: 'productimages',
                X: 'abcd',
                Y: 'hsn',
                Z: 'stock'                
            }
        }]
    });
    console.log(excelData);

    excelData.Sheet1.forEach(function (arrayItem) {

        Product.findOne({ productCode: arrayItem.productCode }, function (err, product) {
            if (product) {
                Product.updateOne({ _id: product._id }, {$set: { productName: arrayItem.productName, productCode: arrayItem.productCode, strength: arrayItem.strength, dosageForm: arrayItem.dosageForm, packingForm: arrayItem.packingForm, packingDisplay: arrayItem.packingDisplay, packingSize: arrayItem.packingSize, weight: arrayItem.weight, care: arrayItem.care, salt: arrayItem.salt, saltGroup: arrayItem.saltGroup, speciality: arrayItem.speciality, condition: arrayItem.condition, manufacturer: arrayItem.manufacturer, mrp: arrayItem.mrp, priceToCust: arrayItem.priceToCust, taxPercnt: arrayItem.taxPercnt, prescriptReq: arrayItem.prescriptReq, pap: arrayItem.pap, papoffer: arrayItem.papoffer, country: arrayItem.country, productimages: arrayItem.productimages, abcd: arrayItem.abcd, hsn: arrayItem.hsn, stock: arrayItem.stock} },
                    function (err, user) {
                        if (err) return res.status(500).send({
                            status: status,
                            message: 'Something went wrong',
                            data: data
                        })
                    });
            } else {
                Product.create({
                    productName: arrayItem.productName,
                     productCode: arrayItem.productCode, 
                     strength: arrayItem.strength, 
                     dosageForm: arrayItem.dosageForm, 
                     packingForm: arrayItem.packingForm, 
                     packingDisplay: arrayItem.packingDisplay, 
                     packingSize: arrayItem.packingSize, 
                     weight: arrayItem.weight, 
                     care: arrayItem.care, 
                     salt: arrayItem.salt, 
                     saltGroup: arrayItem.saltGroup, 
                     speciality: arrayItem.speciality, 
                     condition: arrayItem.condition, 
                     manufacturer: arrayItem.manufacturer, 
                     mrp: arrayItem.mrp, 
                     priceToCust: arrayItem.priceToCust, 
                     taxPercnt: arrayItem.taxPercnt, 
                     prescriptReq: arrayItem.prescriptReq, 
                     pap: arrayItem.pap, 
                     papoffer: arrayItem.papoffer, 
                     country: arrayItem.country, 
                     productimages: arrayItem.productimages, 
                     abcd: arrayItem.abcd, 
                     hsn: arrayItem.hsn, 
                     stock: arrayItem.stock
                },
                    function (err, user) {
                        if (err) return res.status(500).send({
                            status: status,
                            message: 'Something went wrong',
                            data: data
                        })
                    });
            }
        });
    });

    fs.unlinkSync(filePath);
}