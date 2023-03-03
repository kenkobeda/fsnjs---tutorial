import knex from 'knex';


export const Db = knex({
    client: process.env.CLIENT,
    connection: {
        host : '127.0.0.1',
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE
    }
});

// export const Db = require('knex')({
//         client: process.env.CLIENT,
//         connection: {
//         host : '127.0.0.1',
//         port: '5432',
//         user : process.env.USER,
//         password : process.env.PASSWORD,
//         database : process.env.DATABASE
//     }
// });

export async function FetchPost() {
    const Posts = await Db('title').select('*')
    return Posts
}

export async function FetchUsers() {
    const Users = await Db('users').select('*')
    return Users
}