import classes from './meetup-details.module.css';

export default function MeetupDetail(props){
    return (
      <>
        <section className={classes.detail}>
          <img src={props.image} alt={props.title} />
          <h1>{props.title}</h1>
          <h4>{props.address}</h4>
          <p>{props.description}</p>
        </section>
      </>
    );
}