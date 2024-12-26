"use client";

import { useState } from "react";

import type { Comment } from "@/types/comment";

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

interface CommentsProps {
  postId: string;
  initialComments?: Comment[];
}

export function Comments({ postId, initialComments = [] }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments</h2>
      <CommentForm postId={postId} onCommentAdded={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}
