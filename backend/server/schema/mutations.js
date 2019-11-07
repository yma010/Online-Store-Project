const graphql = require("graphql"),
      mongoose = require("mongoose");
      
const {
      GraphQLObjectType,
      GraphQLString,
      GraphQLInt,
      GraphQLID
    } = graphql;
      
const AuthService = require("../services/auth");
const Category = mongoose.model("category"),
      Product = mongoose.model("products");
      

const CategoryType = require("./types/category_type"),
      ProductType = require("./types/product_type"),
      UserType = require("./types/user_type");
    
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Category.remove({ _id: id });
      }
    },
      newProduct: {
        type: ProductType,
        args: { 
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          weight: { type: GraphQLInt }
        },
        resolve(parentValue, {name, description, weight }) {
          return new Product({
            name,
            description,
            weight
          }).save();
        }
      },
      deleteProduct: {
        type: ProductType,
          args: {
            id: { type: GraphQLID } },
          resolve(parentValue, { id }) {
            return Product.remove({_id: id});
          }
        },
      updateProductCategory: {
        type: ProductType,
        args:{ 
          productId: { type: GraphQLID },
          categoryId: { type: GraphQLInt }
        },
        resolve(parentValue, { productId, categoryId}) {
          return Product.updateProductCategory( productId, categoryId )
        }
      },
      register: {
      type: UserType,
      args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
      },
      resolve(_, args) {
          return AuthService.register(args);
      }
    },
      logout: {
        type: UserType,
        args: {
          _id: { type: GraphQLID }
        },
        resolve(_, args) {
          return AuthService.logout(args);
        }
    },
  //Add New Mutations Below
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    }
  //Add New Mutations Above
  }
});

module.exports = mutation;