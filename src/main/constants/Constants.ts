import { facebook, instagram, linkedin, twitter } from '../assets';

export interface FilterCriteria {
  label: string;
  value: string;
}

const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'contactUs',
    title: 'Contact Us',
  },
];

export const footerLinks = [
  {
    title: 'Home',
    links: [
      {
        name: 'FlexVerse',
        link: 'https://www.hoobank.com/how-it-works/',
      },
      {
        name: 'Supplements',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
      {
        name: 'Merchendise',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
    ],
  },
  {
    title: 'Get Started',
    links: [
      {
        name: 'Join a Gym',
        link: 'https://www.hoobank.com/help-center/',
      },
      {
        name: 'Find a Dieticien',
        link: 'https://www.hoobank.com/partners/',
      },
      {
        name: 'Find a Trainer',
        link: 'https://www.hoobank.com/suggestions/',
      },
    ],
  },
  {
    title: 'Join Us',
    links: [
      {
        name: 'Register Your Gym',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
      {
        name: 'Careers',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
    ],
  },
  {
    title: 'Policy',
    links: [
      {
        name: 'Terms & Conditions',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
      {
        name: 'Privacy Policy',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: instagram,
    link: 'https://www.instagram.com/flexverse2023/',
  },
  {
    id: 'social-media-2',
    icon: facebook,
    link: 'https://www.facebook.com/',
  },
  {
    id: 'social-media-3',
    icon: twitter,
    link: 'https://www.twitter.com/',
  },
  {
    id: 'social-media-4',
    icon: linkedin,
    link: 'https://www.linkedin.com/company/flexverse/',
  },
];

export const gymFilterCriteria: FilterCriteria[] = [
  { label: 'Personal Trainer Available', value: 'Personal Trainer Available' },
  { label: 'Swimming Pool', value: 'Swimming Pool' },
  { label: 'Sauna', value: 'Sauna' },
  { label: 'Snack Bar', value: 'Snack Bar' },
  { label: 'Juice Bar', value: 'Juice Bar' },
  { label: 'Punching Bags', value: 'Punching Bags' },
  { label: 'Crossfit Training Area', value: 'Crossfit Training Area' },
  { label: 'Lockers', value: 'Lockers' },
  { label: 'Badminton Court', value: 'Badminton Court' },
  { label: 'Basketball Court', value: 'Basketball Court' },
];

export const trainerSpecialization: FilterCriteria[] = [
  { label: 'Powerlifting', value: 'Powerlifting' },
  { label: 'General Fitness', value: 'General Fitness' },
  { label: 'Bodybuilding', value: 'Bodybuilding' },
  { label: 'Weight loss', value: 'Weight loss' },
  { label: 'Yoga', value: 'Yoga' },
  { label: 'Pilaties', value: 'Pilaties' },
  { label: 'Zumba', value: 'Zumba' },
  { label: 'Crossfit', value: 'Crossfit' },
  { label: 'Calesthenics', value: 'Calesthenics' },
];

export const consultationsPerPage = 5;

export const completedConsultationStatuses = ['COMPLETED', 'CANCELLED'];

export const activeConsultationStatus = ['SCHEDULED'];

export default navLinks;
