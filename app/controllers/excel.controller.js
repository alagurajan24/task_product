const db = require("../models");
const excelToJson = require('convert-excel-to-json');
const excel = require("exceljs");
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
            name: 'products',
            header: {
                rows: 1
            },
            columnToKey: {
                A: 's.no',
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

    excelData.products.forEach(function (arrayItem) {

        Product.findOne({ productCode: arrayItem.productCode }, function (err, product) {
            if (product) {
                Product.updateOne({ _id: product._id }, { $set: { productName: arrayItem.productName, strength: arrayItem.strength, dosageForm: arrayItem.dosageForm, packingForm: arrayItem.packingForm, packingDisplay: arrayItem.packingDisplay, packingSize: arrayItem.packingSize, weight: arrayItem.weight, care: arrayItem.care, salt: arrayItem.salt, saltGroup: arrayItem.saltGroup, speciality: arrayItem.speciality, condition: arrayItem.condition, manufacturer: arrayItem.manufacturer, mrp: arrayItem.mrp, priceToCust: arrayItem.priceToCust, taxPercnt: arrayItem.taxPercnt, prescriptReq: arrayItem.prescriptReq, pap: arrayItem.pap, papoffer: arrayItem.papoffer, country: arrayItem.country, productimages: arrayItem.productimages, abcd: arrayItem.abcd, hsn: arrayItem.hsn, stock: arrayItem.stock } },
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

exports.download = (req, res) => {
    Product.find().then((arrayItems) => {
        let products = [];
        arrayItems.forEach((arrayItem,i) => {
            products.push({
                productID: i+1,
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
            });
        });
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("Products");
        worksheet.columns = [
            { header: "S.No", key: "productID", width: 5 },
            { header: "Product Name", key: "productName", width: 5 },
            { header: "Product Code", key: "productCode", width: 5 },
            { header: "Strength", key: "strength", width: 5 },
            { header: "Dosage Form", key: "dosageForm", width: 5 },
            { header: "Packing Form", key: "packingForm", width: 5 },
            { header: "Packing Display", key: "packingDisplay", width: 5 },
            { header: "Packing Size", key: "packingSize", width: 5 },
            { header: "Weight", key: "weight", width: 5 },
            { header: "Care", key: "care", width: 5 },
            { header: "Salt", key: "salt", width: 5 },
            { header: "Salt Group", key: "saltGroup", width: 5 },
            { header: "Speciality", key: "speciality", width: 5 },
            { header: "Condition", key: "condition", width: 5 },
            { header: "Manufacturer", key: "manufacturer", width: 5 },
            { header: "MRP", key: "mrp", width: 5 },
            { header: "price To Customer", key: "priceToCust", width: 5 },
            { header: "TaxPercnt", key: "taxPercnt", width: 5 },
            { header: "Prescription Required", key: "prescriptReq", width: 5 },
            { header: "PAP", key: "pap", width: 5 },
            { header: "Pap Offer", key: "papoffer", width: 5 },
            { header: "Country", key: "country", width: 5 },
            { header: "Product Images", key: "productimages", width: 5 },
            { header: "ABCD", key: "abcd", width: 5 },
            { header: "HSN", key: "hsn", width: 5 },
            { header: "STOCK", key: "stock", width: 5 },
        ];
        // Add Array Rows
        worksheet.addRows(products);
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "products.xlsx"
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    });
};