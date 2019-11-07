const mongoose = require("mongoose"),
      axios = require("axios");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const UserType = require("./user_type");
const User = mongoose.model("users");

const ProductType =require("./product_type"),
      Product = mongoose.model("products");

const secretKey = require("../../../config/keys");

const authOptions = {
  method: "GET",
  url: "https://fzax5kzdc9.execute-api.us-west-1.amazonaws.com/default/generate-price", 
  headers: {
    "x-api-key": secretKey.AWSKey
  }
};

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    product: {
      type: ProductType,
      args: { _id: { type: GraphQLID } },
      resolve(_, args) {
        // find our product
        return Product.findById(args._id).then(product => {
          // then fetch our price using the above options
          return axios(authOptions).then(res => {
            // set our cost onto the Product Object
            product.cost = res.data.cost;
            // then return the complete product object
            return product;
          });
        });
      }
    }
  })
});

module.exports = RootQueryType;
