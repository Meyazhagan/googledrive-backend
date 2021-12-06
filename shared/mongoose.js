const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to mongo db");
    } catch (err) {
        console.log("Error in Connecting BD ", err);
    }
};

module.exports = connect;
