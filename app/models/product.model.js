const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            productName: String,
            productCode: String,
            dosageForm: String,
            packingForm: String,
            packingDisplay: String,
            packingSize: Number,
            weight: Number,
            care: { type: String, default: "Yes" },
            salt: String,
            saltGroup: String,
            speciality: Array,
            manufacturer: String,
            mrp: Number,
            priceToCust: Number,
            discountMrp: Number,
            taxPercnt: Number,
            condition: Array,
            homeCategory: Array,
            hsn: Number,
            country: String,
            strength: String,
            stock: { type: String, default: "Yes" },
            stockType: String,
            reason: String,
            prescriptReq: { type: String, default: "Yes" },
            pap: { type: String, default: "Yes" },
            papOffer: String,
            abcd: String,
            productimages: Array,
            seoTitle: String,
            keywords: String,
            description: String,
            status: { type: Number, default: 1 }
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("product", schema);
    return User;
};