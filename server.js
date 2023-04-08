const path = require('path');
const result = require('dotenv').config({
    path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
});

if (result.error) {
    throw new Error(result.error);
}


const express = require('express');
const cors = require('cors');
const { postgrator } = require('./lib/db');
const app = express();
const { uploadedFilesFolderName } = require('./middlewares/multipart')

app.use(cors());
app.use(express.json());

app.use("/" + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use('/users', require('./routes/users')); // every route on users will be ".../users"
app.use('/adm', require('./routes/adm')); // every route on users will be ".../adm"

app.get('/', (req, res) => {
    res.send('Hello world');
});

const host = process.env.HOST;
const port = +process.env.PORT;

postgrator.migrate().then((result) => { // making sure we are migrating the data base before the server is listening for requests, to make sure the data base is structured as it should have
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
        console.log(`server is listening at http://${host}:${port}`);
    });
}).catch(error => console.error(error));
