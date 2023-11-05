
const mongoose = require('mongoose');

let connectionString = `mongodb+srv://userOne:${process.env.MONGO_PASS}@cluster0.sigccyn.mongodb.net/Practice?retryWrites=true&w=majority`;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

