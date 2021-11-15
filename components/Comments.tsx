import { Calendar, Comment, User } from ".prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { useDeleteComment } from "../pages/api/calendars/[calendarId]/comments/delete";

type Props = {
  comments: (Comment & {
    user: User;
  })[];
  calendar: Calendar & {
    comments: Comment[];
  };
};

export const Comments = ({ comments, calendar }: Props) => {
  const session = useSession();
  const deleteComment = useDeleteComment();

  const handleDelete = (comment: Comment) => {
    try {
      confirm("Delete this comment?") && deleteComment(comment, calendar);
    } catch (error) {}
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <p>
            By {comment.user.name} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}{" "}
            {new Date(comment.createdAt).toLocaleTimeString()}
          </p>
          <p>{comment.text}</p>
          <button style={{ margin: "auto" }}>Reply</button>
          <button style={{ margin: "auto" }}>Report</button>
          {comment.userId === session.data?.user.id && (
            <button
              style={{ margin: "auto" }}
              onClick={() => handleDelete(comment)}
            >
              Delete
            </button>
          )}

          {index !== comments.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};
