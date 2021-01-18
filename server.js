const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Models
const db = require('./src/models');

const app = express();

let whiteList = [
    'http://localhost:8081',
];

let corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOption));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync database
db.sequelize.sync();

// route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to My Server'
    });
});

// Posts routes
require('./src/routes/post.routes')(app);

// set port
const PORT = process.env.PORT || 8080;

// run app
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
})