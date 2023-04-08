const express = require('express');
const {getAllUsers, getUserById, createPet, getAllPets, getPetById, updatePet} = require ('../data/adm');
const {PetValidationSchema} = require('./petSchema');
const getValidationMiddleware = require('../middlewares/validation');
const {upload} = require('../middlewares/multipart');
const {uploadToCloudinary} = require('../lib/cloudinary');
const fs = require('fs');
const {auth} = require('../middlewares/auth');

const router = express.Router();

router.get('/user',auth, async (req,res) => { // take the users from data base
    const results = await getAllUsers();
    res.status(200).send({user: results});
});

router.get('/user/:id',auth, async (req,res) => { // take the user from data base
    const {id} = req.params 
    const results = await getUserById(id);
    res.status(200).send({user: results});
});

router.post('/pet', getValidationMiddleware(PetValidationSchema), auth, async (req,res, next) => { // insert the new pet to data base
    const {type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal} = req.body;
    await createPet(type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal);
    res.status(201).send({pet: {type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal}});
    }
)

router.get('/pets',auth, async (req,res) => { // take the users from data base
    const results = await getAllPets();
    res.status(200).send({user: results});
});

router.get('/pet/:id',async (req,res) => { // take the pet by id from data base
    const {id} = req.params 
    const results = await getPetById(id);
    res.status(200).send({pet: results});
});

router.put('/pet/img', auth, upload.single('image'), async (req,res) => { // save pet picture to cloCloudinary to get the URL
    const PictureFromCloudinary = await uploadToCloudinary(req.file.path)
    const petPicturUrl = PictureFromCloudinary.secure_url;
    fs.unlinkSync(req.file.path);
    res.status(201).send({petPictureURL: petPicturUrl});
});

router.put('/pet/:id', getValidationMiddleware(PetValidationSchema), auth, async (req,res) => { // edit the pet by id from data base
    const {id} = req.params;
    const {type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal} = req.body;
    const results = await updatePet(type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed_of_animal, id);
    res.status(202).send({pet: results});
});

module.exports = router;