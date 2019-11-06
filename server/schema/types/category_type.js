const mongoose = require("mongoose");
const graphql = require("graphql");
const Product = mongoose.model("products");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(require("./product_type")),
      resolve(parentValue){
        return Product.findById(parentValue.id).populate("products")
        .then(category => category.products)
      }
    }
  })
});

module.exports = CategoryType;