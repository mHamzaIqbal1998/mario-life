import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, Link } from "@builder.io/qwik-city";
import Card from "~/components/card/card";

interface BlogData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export const useBlogData = routeLoader$(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = (await res.json()) as BlogData[];
  return data.slice(0, 12);
});

export default component$(() => {
  const blogs = useBlogData();

  return (
    <>
      <h2>Mario life</h2>
      <Resource
        value={blogs}
        onPending={() => <div>Loading blogs...</div>}
        onResolved={(blogs) => (
          <div class="blogs">
            {blogs.length &&
              blogs.map((blog) => (
                <Card key={blog.id}>
                  <h3 q:slot="title">{blog.title}</h3>
                  <p q:slot="content">{blog.body.slice(0, 50)}...</p>
                  <Link q:slot="footer" href={`blog/${blog.id}`}>
                    <button>Read More</button>
                  </Link>
                </Card>
              ))}
          </div>
        )}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Mario Life",
  meta: [
    {
      name: "description",
      content: "A mario-life blog built with qwik",
    },
  ],
};
