const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//test data
// const customers = [
//   {id: '1', name: 'Jon', email: 'jon@gmail.com', age: 28},
//   {id: '2', name: 'Mike', email: 'mike@gmail.com', age: 34},
//   {id: '3', name: 'Chris', email: 'chris@gmail.com', age: 45},
//   {id: '4', name: 'Tom', email: 'tom@gmail.com', age: 22}
// ]

//Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    age: {type:GraphQLInt}
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //return customer's by id
    customer: {
      type: CustomerType,
      args: {
        id: {type:GraphQLString}
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers/' + args.id)
          .then(res => res.data);
      }
    },
    //return full list of customers
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:3000/customers')
        .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
