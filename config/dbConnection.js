const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.ATLAS_URL
        );
        console.log('Database Connected');
    } catch (error) {
        console.log('Error connecting to database:', error);
        process.exit(1); 
    }
};

module.exports = dbConnection;