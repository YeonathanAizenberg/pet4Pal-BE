const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail, updateUserById, getUserById, getPetSearch, getPetAdvSearch, adoptPet, getPetByOwner, addPetsByUserId, getPetsByUserId, removePetsByUserId, getSavedPetsByUserId } = require ('../data/users');
const {NewUserValidateSchema} = require('./usersSchemas');
const {loginUserSchema} = require('./loginUserSchema');
const {updateUserSchema} = require('./updateUserSchema');
const {adoptPetValidationSchema} = require('./adoptPetValidationSchema');
const getValidationMiddleware = require('../middlewares/validation');
const jwt = require('jsonwebtoken');
const {auth} = require('../middlewares/auth');

const router = express.Router();

router.post('/',getValidationMiddleware(NewUserValidateSchema), async (req,res, next) => { // insert the new user to data base
    const {email, password, firstName, lastName, phoneNumber} = req.body;
    bcrypt.hash(password, 10, async (err, hash)  => {
        if(err) next(err);
        else {
            const user = await getUserByEmail(email);
            if(user) {
                res.status(403).send({errors:[{message:'user already exists with this email'}]});
                return;
            }
            const role = "user" // change "user" to "adm" before creating a new user, to create a new adm // If you want to check de adm page, use 'adm@gmail.com' and password "123" // Need to log out and log in to go to access the adm page for the first time!
            await createUser(email, hash, firstName, lastName, phoneNumber, role);
            const thisUser = await getUserByEmail(email);
            const token = jwt.sign({id:thisUser.id}, process.env.JWT_SECRET);
            res.status(201).send({token, user: {id:thisUser.id, email, password, firstName, lastName, phoneNumber, role}});
        }
    });
});

router.post('/login',getValidationMiddleware(loginUserSchema), async (req,res,next) => { // Checking the existing user password for this email
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if(!user) {
        res.status(404).send({errors:[{message:'User not found with this email'}]});
        return
    }
    bcrypt.compare(password, user.password_hash, (err, result) => {
        if(err) next(err);
        else {
        if(result) { 
            const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET);
            res.status(202).send({ 
                token,
                user: {
                role: user.role,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                created_date: user.created_date,
                id: user.id } 
            });
        } else {
            res.status(401).send({errors:[{message:'incorrect password'}]})
        }
    }
    });
});

router.put('/:id', getValidationMiddleware(updateUserSchema), auth , async (req,res) => { // edit the user by id from data base
    const {id} = req.params;
    const {email,password,fname,lname,phone, bio, currentEmail} = req.body;
    const user = await getUserByEmail(email);
    if(user && currentEmail !== user.email) {
        res.status(400).send({errors:[{message:'User with this email already exist'}]});
        return
    }
    bcrypt.hash(password, 10, async (err, hash)  => {
        if(err) next(err);
        else {
    const results = await updateUserById(email,hash,fname,lname,phone, bio, id);
    res.status(202).send({user: results});
    }});
}); 

router.get('/search', async (req,res) => {
    const results = await getPetSearch();
    res.status(200).send({pets: results});
});

router.get('/adv_search', async (req,res) => { 
    const results = await getPetAdvSearch();
    res.status(200).send({pets: results});
});

router.get('/:id', auth ,async (req,res) => {
    const {id} = req.params 
    const results = await getUserById(id);
    res.status(200).send({user: results});
});

router.put('/pet/:id', getValidationMiddleware(adoptPetValidationSchema), auth , async (req,res) => { // edit the pet by id from data base
    const {id} = req.params;
    const {userId, petStatus} = req.body;
    const results = await adoptPet(id, userId, petStatus);
    res.status(201).send({pet: results});
});

router.get('/pet/:ownerId', auth ,async (req,res) => { 
    const {ownerId} = req.params;
    const results = await getPetByOwner(ownerId);
    res.status(200).send({pet: results});
});

router.post('/pet/:id/:ownerId', auth ,async (req,res) => {
    const {ownerId} = req.params;
    const {id} = req.params;
    const results = await addPetsByUserId(id, ownerId);
    res.status(201).send({pets: results});
});

router.get('/pet/:id/:ownerId',auth , async (req,res) => {
    const {ownerId} = req.params;
    const {id} = req.params;
    const results = await getPetsByUserId(id, ownerId);
    res.status(200).send({pets: results});
});

router.delete('/pet/:id/:ownerId', auth ,async (req,res) => { 
    const {ownerId} = req.params;
    const {id} = req.params;
    const results = await removePetsByUserId(id, ownerId);
    res.status(200).send({pets: results});
});

router.get('/myPets/:ownerId',auth , async (req,res) => { 
    const {ownerId} = req.params;
    const results = await getSavedPetsByUserId(ownerId);
    res.status(200).send({pet: results});
});

module.exports = router;