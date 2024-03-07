import { MongoClient } from "mongodb";

 export default async function handler(req, res) {
   if (req.method === "POST") {
     const data = req.body;

    //  const { title, image, address, description } = data;

    const client = await MongoClient.connect(
       "mongodb+srv://daca123:daca123@cluster0.qi69mto.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0"
     );
     const db = client.db();

     const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup inserted!'});
   }
 }