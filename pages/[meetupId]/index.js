import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetails(props){

    return (
      <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
        <MeetupDetail
          image={props.meetupData.image}
          title={props.meetupData.title}
          address={props.meetupData.address}
          description={props.meetupData.description}
        />
      </>
    );
}

export async function getStaticPaths(){
    const client = await MongoClient.connect(
      "mongodb+srv://daca123:daca123@cluster0.qi69mto.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = meetupsCollection.find({}, {_id:1}).toArray(); // we are fetching document objects but they each will only contain ID, nothing else.

    // client.close();

    return{
        fallback: false,
        paths: (await meetups).map(meetup => ({params: {meetupId: meetup._id.toString()}, })),
    };
}

export async function getStaticProps(context){
  // fetch data for a single meetup
  const meetupId = context.params.meetupId; //da dobijemo id meetup-a koji nam treba meetupId zbog slug-a

  const client = await MongoClient.connect(
    "mongodb+srv://daca123:daca123@cluster0.qi69mto.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const objId = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: objId,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}