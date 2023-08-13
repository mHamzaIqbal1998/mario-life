import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import ContactStyles from "./contact.css?inline";

export default component$(() => {
  useStylesScoped$(ContactStyles);

  const formVisible = useSignal(false);
  const formState = useStore({ name: "", message: "" });

  return (
    <article>
      <h2>Contact</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, fugiat.
        Doloremque repellat harum recusandae asperiores corporis aspernatur
        nesciunt! Nam, ratione tempore? Quod, error fuga maxime consectetur
        dolorum consequuntur labore numquam.
      </p>

      <button onClick$={() => (formVisible.value = true)}>Contact Me</button>

      {formVisible.value && (
        <form
          preventdefault:submit
          onSubmit$={() => {
            formState.name = "";
            formState.message = "";
          }}
        >
          <label>
            <span>Your name:</span>
            <input
              type="text"
              value={formState.name}
              onInput$={(e) =>
                (formState.name = (e.target as HTMLInputElement).value)
              }
            />
          </label>
          <label>
            <span>Your message:</span>
            <textarea
              value={formState.message}
              onInput$={(e) =>
                (formState.message = (e.target as HTMLInputElement).value)
              }
            ></textarea>
          </label>
          <button>Send</button>

          <p>{formState.name}</p>
          <p>{formState.message}</p>
        </form>
      )}
    </article>
  );
});

export const head: DocumentHead = {
  title: "Contact",
  meta: [
    {
      name: "description",
      content: "A mario-life blog built with qwik",
    },
  ],
};
