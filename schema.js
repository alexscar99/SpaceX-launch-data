const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

// launch type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType }
    })
});

// rocket type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: async (parent, args) => {
                const res = await axios.get(
                    'https://api.spacexdata.com/v3/launches'
                );
                return res.data;
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const res = await axios.get(
                    `https://api.spacexdata.com/v3/launches/${
                        args.flight_number
                    }`
                );
                return res.data;
            }
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve: async (parent, args) => {
                const res = await axios.get(
                    'https://api.spacexdata.com/v3/rockets'
                );
                return res.data;
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const res = await axios.get(
                    `https://api.spacexdata.com/v3/rockets/${args.id}`
                );
                return res.data;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
