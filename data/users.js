const {query} = require('../lib/db'); // use the query I created on db.js line 27
const SQL = require('@nearform/sql'); // secure data from cyber vertical attack

function getUser() {
    return query (SQL `SELECT * FROM users`);
}

exports.getUser = getUser

async function getUserById(id) {
    const rows = await query (SQL `SELECT firstName, lastName, bio, email, phoneNumber FROM users WHERE id=${id}`);
    return rows[0];
}

exports.getUserById = getUserById

function createUser(email, hash, firstName, lastName, phoneNumber, role) {
    const sql = SQL `INSERT INTO users (email, password_hash, firstName, lastName, phoneNumber, role) VALUES (${email},${hash},${firstName},${lastName},${phoneNumber},${role})`;
    return query (sql);
}

exports.createUser = createUser

async function getUserByEmail(email) {
    const rows = await query (SQL `SELECT * FROM users WHERE email=${email}`);
    return rows[0];
}

exports.getUserByEmail = getUserByEmail;

async function updateUserById(email,password_hash,fname,lname,phone, bio, id) {
    const sql = SQL `UPDATE users SET email=${email}, password_hash=${password_hash}, firstName=${fname}, lastName=${lname}, phoneNumber=${phone}, bio=${bio} WHERE id=${id}`;
    return query(sql);
}

exports.updateUserById = updateUserById;

function getPetSearch() {
    return query (SQL `SELECT id, name, picture type FROM pets`); // get all pets from the table 
}

exports.getPetSearch = getPetSearch

function getPetAdvSearch() {
    return query (SQL `SELECT id, name, adoption_status, type, height, weight, picture FROM pets`); // get all pets from the table 
}

exports.getPetAdvSearch = getPetAdvSearch

async function adoptPet(id, userId, petStatus) {
    const sql = SQL `UPDATE pets SET adoption_status=${petStatus}, owner_id=${userId} WHERE id=${id}`;
    return query(sql);
}

exports.adoptPet = adoptPet;

async function getPetByOwner(ownerId) {
    return query (SQL `SELECT * FROM pets WHERE owner_id=${ownerId}`);
}

exports.getPetByOwner = getPetByOwner;

async function addPetsByUserId(id, userId) {
    return query (SQL `INSERT INTO saved_pets (petId,userId) VALUES (${id},${userId})`);
}

exports.addPetsByUserId = addPetsByUserId;

async function getPetsByUserId(id, userId) {
    return query (SQL `SELECT id FROM saved_pets WHERE userId=${userId} AND petId=${id}`);
}

exports.getPetsByUserId = getPetsByUserId;

async function removePetsByUserId(id, userId) {
    return query (SQL `DELETE FROM saved_pets WHERE userId=${userId} AND petId=${id}`);
}

exports.removePetsByUserId = removePetsByUserId;

async function getSavedPetsByUserId(userId) {
    return query (SQL `SELECT * FROM saved_pets INNER JOIN pets ON saved_pets.petId = pets.id WHERE userId=${userId}`);
}

exports.getSavedPetsByUserId = getSavedPetsByUserId;