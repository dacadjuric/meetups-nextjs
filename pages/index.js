import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";



export default function HomePage(props){
    return (
      <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse all meetups" />
      </Head>
        <MeetupList meetups={props.meetups} />
      </>
    );
}

export async function getStaticProps(props){
    //fetch data from api

    const client = await MongoClient.connect(
      "mongodb+srv://daca123:daca123@cluster0.qi69mto.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 10
    };
}

// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     //fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }