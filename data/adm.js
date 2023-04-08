const {query} = require('../lib/db'); // use the query I created on db.js line 27
const SQL = require('@nearform/sql'); // secure data from cyber vertical attack

function getAllUsers() {
    return query (SQL `SELECT firstName, lastName, id, role FROM users`); // get all users from the table
}

exports.getAllUsers = getAllUsers 

async function getUserById(id) {
    const rows = await query (SQL `SELECT firstName, lastName, role, email, phoneNumber FROM users WHERE id=${id}`);
    return rows[0];
}

exports.getUserById = getUserById 

function createPet(type, name, status, image, height, weight, color, bio, hypo, dietary, breed) {
    const sql = SQL `INSERT INTO pets (type, name, adoption_status, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal, picture) VALUES (${type},${name},${status},${height},${weight},${color},${bio},${hypo},${dietary},${breed},${image})`;
    return query (sql);
}

exports.createPet = createPet

function getAllPets() {
    return query (SQL `SELECT id, adoption_status, type, height, weight, name, picture FROM pets`); // get all pets from the table 
}

exports.getAllPets = getAllPets 

async function getPetById(id) {
    const rows = await query (SQL `SELECT * FROM pets WHERE id=${id}`);
    return rows[0];
}

exports.getPetById = getPetById 

function updatePet( type, name, status, image, height, weight, color, bio, hypo, dietary, breed, id) {
    const sql = SQL `UPDATE pets SET type=${type}, name=${name}, adoption_status=${status}, picture=${image}, height=${height}, weight=${weight}, color=${color}, bio=${bio}, hypoallergenic=${hypo}, dietary_restrictions=${dietary}, breed_of_animal=${breed} WHERE id=${id}`;
    return query(sql);
}

exports.updatePet = updatePet 