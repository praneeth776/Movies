import app from "./server.js"
import mongodb from "mongodb"
// import ReviewsDAO from "./da0/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;

const mongoUsername = process.env['USERNAME'];
const mongoPassword = process.env['PASSWORD'];
const uri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.ytgea6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

MongoClient.connect(
    uri,
    {
        maxPoolSize : 50,
        wtimeoutMS : 2500,
        //useNewUrlParser : true
    })
    .catch(error => {
        console.error(error.stack);
        process.exit(1);
    })
    .then(async client =>{
        app.listen(port, () => { // This is how we start the server
            console.log(`Listening on port ${port}`);
        }) 
    })