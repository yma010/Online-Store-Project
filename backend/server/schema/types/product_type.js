const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    cost: {type: GraphQLInt},
    description: {type: GraphQLString },
    weight: { type: GraphQLInt }
  })
});

module.exports = ProductType;