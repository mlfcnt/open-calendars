import { Calendar, Comment, Prisma } from ".prisma/client";
import { useSession } from "next-auth/react";
import React, { FormEvent, useRef } from "react";
import { useSaveComment } from "../pages/api/calendars/[calendarId]/comments/add";

type Props = {
  calendar: Calendar & {
    comments: Comment[];
  };
};

export const AddCommentForm = ({ calendar }: Props) => {
  const { data: session } = useSession();
  const formRef = useRef<any>();
  const saveComment = useSaveComment();

  const userId = session?.user?.id;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!userId) {
      alert("You must be logged in to add a comment");
      return;
    }
    const comment: Prisma.CommentCreateInput = {
      text: form?.comment?.value as string,
      calendar: {
        connect: {
          name: calendar.name,
        },
      },
      user: {
        connect: {
          email: session.user.email!,
        },
      },
    };
    try {
      saveComment(comment, calendar, session.user);
      form.comment.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <h3>Add a comment</h3>
      <form style={{ marginTop: "20px" }} onSubmit={handleSubmit} ref={formRef}>
        <textarea name="comment" id="comment" cols={100} rows={5} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
