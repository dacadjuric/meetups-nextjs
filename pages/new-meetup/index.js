import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";


export default function NewMeetupPage(){
    const router = useRouter();
    
    async function addMeetupHandler(eneterdMeetupData){
        const response = await fetch("/api/new-meetup", { //new-meetup je ime fajla u folderu api
          method: "post",
          body: JSON.stringify(eneterdMeetupData),
          headers: {
            'Content-Type' : 'application/json'
          }
        });

        const data = await response.json();
        //here we can do something with this data
        console.log(data);

        router.push('/');
    }
    
    return <>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="Add a new meetup" />
      </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
}