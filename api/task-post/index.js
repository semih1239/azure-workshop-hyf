const mongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);
    const client = await mongoClient.connect(process.env.COSMOSDB_CONNECTION_STRING)

    const label = req.body.label

    const database = client.db("workshop")
    const todo = { userId: user.userId, label, status: '' }

    const insert = database.collection("tasks").insertOne(todo)

    const responseMessage = insert ? "Added" : "Error"

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}