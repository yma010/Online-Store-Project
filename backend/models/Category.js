const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    ]
  }
});

CategorySchema.statics.retrieveAllProducts = function(categoryId, productId ) {
  const Product = mongoose.model("products");

  return Product.find({
    _id: {
      $in: [categoryId, productId]
    }
  }).then(products => {
    return Promise.all([products.save()])
    .then(
      ([products]) => products
    );
  });
};

module.exports = mongoose.model('category', CategorySchema);