import { useSession } from "next-auth/react";
import React, { FormEvent, useRef, useState } from "react";
import { saveCalendar } from "../pages/api/calendars/new";
import { useCategories } from "../pages/api/categories";

export default function AddCalendar() {
  const [showModal, setShowModal] = useState(false);
  const { data: categories } = useCategories();
  const formRef = useRef<any>();

  const { status } = useSession();

  const userIsLoggedIn = status === "authenticated";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;

    //TODO mutation

    saveCalendar({
      name: form?.name?.value,
      //TODO regex
      url: form?.url?.value,
      description: form?.description?.value,
      category: {
        connect: {
          id: form?.categoryId?.value,
        },
      },
    });
  };

  return (
    <>
      <button
        disabled={!userIsLoggedIn}
        onClick={() => setShowModal(!showModal)}
        title={
          !userIsLoggedIn ? "You need to be logged in to add a calendar" : ""
        }
        style={{
          cursor: !userIsLoggedIn ? "not-allowed" : "default",
        }}
      >
        Add a calendar
      </button>
      <div hidden={!showModal}>
        <form onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
          <label htmlFor="description">Url</label>
          <input type="text" name="url" id="url" />
          <label htmlFor="description">Category</label>
          <select name="categoryId" id="categoryId">
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
