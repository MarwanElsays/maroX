import { ArticleCardProps } from '../components/ArticleCard/ArticleCard';

export const timeLineData: ArticleCardProps[] = [
  {
    image: 'https://picsum.photos/id/200/600/400',
    title: 'Kickoff Meeting',
    content: 'Project kickoff meeting to discuss goals and timelines.',
    badges: ['Planning'],
    author: {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    postedAt: '2025-01-01',
    likes: 12,
  },
  {
    image: 'https://picsum.photos/id/100/600/400',
    title: 'First Prototype Released',
    content: 'Initial prototype of the application is now available for testing.',
    badges: ['Development'],
    author: {
      name: 'Bob Smith',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    postedAt: '2025-02-10',
    likes: 34,
  },
  {
    image: 'https://picsum.photos/id/1/600/400',
    title: 'User Feedback Round',
    content: 'Collecting user feedback on the first prototype to improve design.',
    badges: ['Testing'],
    author: {
      name: 'Cathy Nguyen',
      avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    },
    postedAt: '2025-03-20',
    likes: 21,
  },
  {
    image: 'https://picsum.photos/id/20/600/400',
    title: 'Final Release',
    content: 'The final version of the application is now live and available to users.',
    badges: ['Launch'],
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
    },
    postedAt: '2025-05-01',
    likes: 57,
  },
];
