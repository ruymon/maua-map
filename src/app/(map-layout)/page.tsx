import {getAllEvents} from "@/lib/events";

export default async function MapRootPage() {
  const data = await getAllEvents();

  if (!data) {
    return <div>No events found</div>;
  }

  return (
      <div>
        <h1>Map Root Page</h1>

        <p>Events:</p>
        <ul>
          {data.map((event) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <img src={event.bannerUrl} alt="Banner" />
            </li>
          ))}
        </ul>
      </div>

  );
}
