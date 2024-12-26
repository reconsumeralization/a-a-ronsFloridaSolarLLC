export interface Comment {
  id: string;
  postId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface CommentFormData {
  name: string;
  email: string;
  content: string;
  postId: string;
}
