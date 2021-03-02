const { MongoClient } = require('mongodb')
const nodeCleanup = require('node-cleanup');
const client = new MongoClient('mongodb://localhost:27017', {
    // Using these because https://mongoosejs.com/ does /shrug
    useNewUrlParser: true,
    useUnifiedTopology: true
})
module.exports.client = client.connect()
    .then(() => client)
    .catch(err => {
        console.error(err, 'db.js (connecting to the database)')
        client.close()
    })
module.exports.db = db = client.db('campuscentral')
module.exports.usersDB = db.collection('users');
module.exports.schoolsDB = db.collection('schools');


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
