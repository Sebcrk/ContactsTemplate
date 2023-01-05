import { useEffect } from "react";
import { Form, useSubmit, useNavigation } from "react-router-dom";

function SearchForm(props) {
  const { q } = props;
  const submit = useSubmit();
    const navigation = useNavigation()


  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q")


  return (
    <Form id="search-form" role="search">
      <input
        id="q"
        className={searching ? "loading" : ""}
        aria-label="Search contacts"
        placeholder="Search"
        type="search"
        name="q"
        defaultValue={q}
        onChange={(event) => {
            const isFirstSearch = q == null;
            submit(event.currentTarget.form, {
              replace: !isFirstSearch,
            });
        }}
      />
      <div id="search-spinner" aria-hidden hidden={!searching}/>
      <div className="sr-only" aria-live="polite"></div>
    </Form>
  );
}

export default SearchForm;
