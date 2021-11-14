import { Comment, User } from ".prisma/client";
import React from "react";

type Props = {
  comments: (Comment & {
    user: User;
  })[];
};

export const Comments = ({ comments }: Props) => {
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
          {index !== comments.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};
