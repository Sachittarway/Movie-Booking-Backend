const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected successfully');
    } catch (error) {
        console.error('Database Connection failed:', error);
    }
};

module.exports = { db };
