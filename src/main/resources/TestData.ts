import type { Trainer } from './Models';
import type { ReviewItem } from './Reviews/Reviews';

export const trainerList: Trainer[] = [
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   services: [],
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asdf',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asdg',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'John Doe',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description: 'Experienced trainer specializing in strength training.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Jane Smith',
  //   sex: 'Female',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Passionate about helping clients improve their cardiovascular health.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
  // {
  //   id: 'asd',
  //   name: 'Alex Johnson',
  //   sex: 'Male',
  //   specializations: [],
  //   services: [],
  //   description:
  //     'Certified yoga instructor with a focus on flexibility and mindfulness.',
  //   address: '69 Loda St, Lasun 42069',
  //   certifications: [
  //     {
  //       certification: 'Bodybulding Coach',
  //       certifyingBody: 'ISSA',
  //     },
  //   ],
  // },
];

// export const reviews: ReviewItem[] = [
//   {
//     firstName: 'John',
//     lastName: 'Doe',
//     rating: 5,
//     review:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Jane Smith',
//     lastName: '',
//     rating: 4,
//     review:
//       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Alice Johnson',
//     lastName: '',
//     rating: 3,
//     review:
//       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Bob Anderson',
//     lastName: '',
//     rating: 5,
//     review:
//       'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Eve Williams',
//     lastName: '',
//     rating: 2,
//     review:
//       'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Michael Brown',
//     lastName: '',
//     rating: 4,
//     review:
//       'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Jennifer Davis',
//     lastName: '',
//     rating: 5,
//     review:
//       'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'David Wilson',
//     lastName: '',
//     rating: 3,
//     review:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Sarah Johnson',
//     lastName: '',
//     rating: 4,
//     review:
//       'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Robert Smith',
//     lastName: '',
//     rating: 5,
//     review:
//       'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   // Additional review items
//   {
//     firstName: 'Emily Anderson',
//     lastName: '',
//     rating: 4,
//     review:
//       'This place exceeded my expectations. Clean facilities and helpful staff.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Michaela Johnson',
//     lastName: '',
//     rating: 3,
//     review: 'Decent gym, but could use more equipment variety.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Daniel Smith',
//     lastName: '',
//     rating: 5,
//     review:
//       'Great atmosphere and trainers who genuinely care about your progress.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Olivia Davis',
//     lastName: '',
//     rating: 4,
//     review: 'Ive been a member for years and have never been disappointed.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Sophia Wilson',
//     lastName: '',
//     rating: 2,
//     review: 'Not impressed with the cleanliness and maintenance.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Jacob Taylor',
//     lastName: '',
//     rating: 5,
//     review: 'Absolutely love this gym. The classes are fantastic!',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Emma Brown',
//     lastName: '',
//     rating: 4,
//     review: 'Friendly staff and a wide range of workout options.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Lucas Anderson',
//     lastName: '',
//     rating: 3,
//     review: 'Average gym with decent equipment.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Ava Johnson',
//     lastName: '',
//     rating: 5,
//     review: 'Top-notch gym with top-notch trainers.',
//     avatar: 'https://via.placeholder.com/40',
//   },
//   {
//     firstName: 'Mia Smith',
//     lastName: '',
//     rating: 4,
//     review: 'Enjoying my time at this gym so far.',
//     avatar: 'https://via.placeholder.com/40',
//   },
// ];
