import { ArticleCardProps } from '@/types/ArticleCardProps';

export const timeLineData: ArticleCardProps[] = [
  {
    post: {
      title: 'Kickoff Meeting',
      content: 'Project kickoff meeting to discuss goals and timelines.',
      status: "PUBLISHED",
      likesCount: 12,
      postId: 0,
      authorId: 0,
      commentsCount: 0
    },
    image: 'https://picsum.photos/id/210/600/400',
    badges: ['Planning'],
    author: {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    postedAt: '2025-01-01',
  },
  {
    post: {
      title: 'First Prototype Released',
      content: 'Initial prototype of the application is now available for testing.',
      status: "PUBLISHED",
      likesCount: 34,
      postId: 0,
      authorId: 0,
      commentsCount: 0
    },
    image: 'https://picsum.photos/id/10/600/400',
    badges: ['Development'],
    author: {
      name: 'Bob Smith',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    postedAt: '2025-02-10',
  },
  {
    post: {
      title: 'User Feedback Round',
      content: 'Collecting user feedback on the first prototype to improve design.',
      status: "PUBLISHED",
      likesCount: 21,
      postId: 0,
      authorId: 0,
      commentsCount: 0
    },
    image: 'https://picsum.photos/id/90/500/400',
    badges: ['Testing'],
    author: {
      name: 'Cathy Nguyen',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    postedAt: '2025-03-20',
  },
  {
    post: {
      title: 'Final Release',
      content: 'The final version of the application is now live and available to users.',
      status: "PUBLISHED",
      likesCount: 57,
      postId: 0,
      authorId: 0,
      commentsCount: 0
    },
    image: 'https://picsum.photos/id/1/600/400',
    badges: ['Launch'],
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    postedAt: '2025-05-01',
  },
];
