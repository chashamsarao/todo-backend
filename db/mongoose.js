const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = `mongodb+srv://chashamS:GpowUuKmVwQWGw3n@cluster0.efkdr.mongodb.net/users?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

    module.exports = {
        mongoose
    }