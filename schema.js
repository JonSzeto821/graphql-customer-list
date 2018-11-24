const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

//test data
const customers = [
  {id: '1', name: 'Jon', email: 'jon@gmail.com', age: 28},
  {id: '2', name: 'Mike', email: 'mike@gmail.com', age: 34},
  {id: '3', name: 'Chris', email: 'chris@gmail.com', age: 45},
  {id: '4', name: 'Tom', email: 'tom@gmail.com', age: 22}
]

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
    customer: {
      type: CustomerType,
      args: {
        id: {type:GraphQLString}
      },
      resolve(parentValue, args) {
        for(let i=0; i < customers.length; i++) {
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
