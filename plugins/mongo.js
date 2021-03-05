const { MongoClient } = require('mongodb')
const nodeCleanup = require('node-cleanup');
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const client = new MongoClient(`mongodb+srv://${mongo_username}:${mongo_password}@campus-central.a55er.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    // Using these because https://mongoosejs.com/ does /shrug
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.connect()
    .then(() => client)
    .catch(err => {
        console.error(err, 'mongo.js (connecting to the database)')
        client.close();
        return client
    })

module.exports.client = client;
/*module.exports.db = db = client.db('campuscentral')
module.exports.usersDB = db.collection('users');
module.exports.schoolsDB = db.collection('schools');
 */


nodeCleanup(function (exitCode, signal) {
    if (signal) {
        client.close(function done() {
            // calling process.exit() won't inform parent process of signal
            console.log('Successfully disconnected from database');
            process.kill(process.pid, signal);
        });
        nodeCleanup.uninstall(); // don't call cleanup handler again
        return false;
    }
});
