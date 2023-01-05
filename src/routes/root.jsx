import { Outlet, redirect, useNavigation } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import Sidebar from "../components/Sidebar/Sidebar";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Sidebar />
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
