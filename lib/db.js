const mysql = require('mysql');
const path = require('path') ;
const Postgrator = require('postgrator');

const postgrator = new Postgrator({ // connection for making the migrations
    migrationDirectory: path.resolve(__dirname, '../migrations'), // take the migrations folder, go one by one and implement it on the data base
    driver: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schemaTable: 'migrations',
});

exports.postgrator = postgrator;

const pool = mysql.createPool({ // connection for creating the data base
    host:  process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

exports.pool = pool;

function query(sql) { // function to be easy to query the data base with Promises instead of call backs
    return new Promise((resolve,reject) => {
        pool.query(sql, (err,result) => {
            if(err) reject (err);
            else resolve(result);
        })
    });
}

exports.query = query;