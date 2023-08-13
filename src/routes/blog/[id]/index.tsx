import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

interface BlogData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useBlogDetails = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + requestEvent.params.id
  );
  if (!res.ok) {
    throw requestEvent.redirect(307, "/");
  }
  const data = (await res.json()) as BlogData;
  return data;
});

export default component$(() => {
  const data = useBlogDetails();

  return (
    <div class="blog">
      <Resource
        value={data}
        onPending={() => <div>Loading blog...</div>}
        onResolved={(data) => (
          <div>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
          </div>
        )}
      />
    </div>
  );
});
