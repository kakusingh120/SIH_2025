const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { PORT } = require('./config/server.config');
const apiRoute = require("./routes/index");
const db = require('./models/index');



const port = PORT;

const setupAndStartServer = async () => {
    try {
        // middleware setup
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // routes
        app.use('/api', apiRoute);

        // test route
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });


        // start server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);

            if (process.env.DB_SYNC) {
                db.sequelize.sync({ alert: true });
            }
        });
    } catch (error) {
        console.log('Error during server setup:', error);
        throw error;
    }
}

setupAndStartServer();