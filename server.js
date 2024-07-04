const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server')

// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String
//     age: Int
//     weight: Float!
//     isOver18: Boolean
//     hobbies: [String!]!
//     user: User
//   }

//   type User {
//     id: Int
//     name: String
//   }
// `)
// var rootValue = {
//   hello({ name }) {
//     return "Hello " + name
//   },
//   age() {
//     return 33;
//   },
//   weight: 77.7,
//   isOver18: true,
//   hobbies: () => {
//     return [ 'Develop', 'WorkOut', 'Travel' ]
//   },
//   user: () => {
//     return {
//         id: 12,
//         name: "Juanix"
//     }
//   }
// };

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString,
            resolve: (obj) => {
                const name =  obj.name.trim().toLowerCase()
                if(obj.admin) {
                    return `${name} (ADMIN)`
                } 
                return name
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => {
                    return 'Hello Juan!'
                }
            },
            user: {
                type: User,
                resolve: () => {
                    return {
                        id: 11,
                        name: "JUANIXX",
                        admin: false
                    }
                }
            }
        }
    })
});

const app = express();

app.all('/graphql', createHandler({ schema }));

app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000);
console.log('Server running!');