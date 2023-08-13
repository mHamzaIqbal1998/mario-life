import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer>
      <div class="container">
        <h4>Copyright @{new Date(Date.now()).getFullYear()}</h4>
      </div>
    </footer>
  );
});
