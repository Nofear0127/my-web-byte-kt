export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: number;
  coverEmoji: string;
}

export interface BlogMeta {
  title: string;
  description: string;
  author: string;
  avatar: string;
}
