mongoose = require('mongoose');
module.exports = {
    connect: DB_URL => {

        mongoose.connect(DB_URL);

        //Log an error if we fail to connect
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
            'MongoDB connection failed: ' + DB_URL
        );

        process.exit();

        });
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};