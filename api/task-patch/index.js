const mongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = async function (context, req) {
    const client = await mongoClient.connect(process.env.COSMOSDB_CONNECTION_STRING)

    const database = client.db("workshop")

    const send = await database.collection("tasks").updateOne(
        { _id: new ObjectId(context.bindingData.id) },
        { $set: { status: req.body.status } }
    );

    context.res = {
        status: send.status, /* Defaults to 200 */
    };
}