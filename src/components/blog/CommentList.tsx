import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

import type { Comment } from '@/types/comment';

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-lg shadow-sm p-6 space-y-4"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {comment.author.avatar
                ? (
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )
                : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {comment.author.name[0].toUpperCase()}
                    </span>
                  </div>
                )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{comment.author.name}</h3>
                <time className="text-sm text-gray-500">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-12 space-y-4">
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="bg-gray-50 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{reply.author.name}</h4>
                    <time className="text-sm text-gray-500">
                      {formatDistanceToNow(reply.createdAt, {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
