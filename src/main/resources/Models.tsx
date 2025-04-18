export interface Certification {
  title: string;
  certifyingBody: string;
  verified: boolean;
}

export interface Specialization {
  title: string;
}

export interface Ratings {
  rating: number;
  count: number;
}

export interface RatingsSummary {
  totalRatings: number;
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStars: number;
}

export interface Service {
  title: string;
}

export interface Trainer {
  id: string;
  firstName: string;
  lastName: string;
  shortBio: string;
  bio: string;
  sex: string;
  city: string;
  state: string;
  country: string;
  averageRating: number;
  specializations: Specialization[];
  description: string;
  certifications: Certification[];
  totalRatings: number;
}

export interface Plans {
  services: string[];
  duration: number;
  cost: number;
}

export interface Appointments {
  id: string;
  status: string;
  datetime: string;
  consultant: ConsultantSummary;
  active: boolean;
  planId: string;
}

export interface Memberships {
  id: number;
  startDate: string;
  endDate: string;
  gymSubscriptionStatus: string;
  membershipOption: MembershipOption;
  gym: Gym;
  stripeCheckoutSessionId: string;
}

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  email: string;
}

export interface Specialization {
  title: string;
}

export interface ConsultantSummary {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  pricePerConsultation: string;
  currency: string;
  specializations: Specialization[];
  averageRating: number;
  totalRatings: number;
}

export interface ConsultantFilter {
  minPrice: number;
  maxPrice: number;
  specializations: string[];
  services: string[];
}

export interface ConsultationCounts {
  totalPending: number;
  totalCompleted: number;
}

export interface GymReview {
  id: string;
  appUser: User;
  gym: Gym;
  reviewTitle: String;
  rating: number;
  review: string;
}

export interface Amenities {
  id: number;
  name: string;
}

export interface MembershipOption {
  id: number;
  duration: string;
  durationLength: number;
  cost: number;
  currency: string;
  amenitiesIncluded: Amenities[];
}

export interface Gym {
  id: number;
  addressLine1: string | null;
  addressLine2: string | null;
  shortBio: string | null;
  name: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  latitude: number;
  longitude: number;
  amenities: Amenities[];
  email: string | null;
  phoneNumber: string | null;
  averageRating: number | null;
  hoursOfOperations: HoursOfOperation[];
  noOfRatings: number;
  reviews: GymReview[];
}

export interface SupportedLocation {
  id: string;
  city: string;
  state: string;
  country: string;
}

export interface HoursOfOperation {
  id: number;
  day: string;
  startTime: number[];
  endTime: number[];
  specialDay: string | null;
}

export interface Consultant {
  id: number;
  firstName: string;
  lastName: string;
  shortBio: string;
  bio: string;
  email: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  pricePerConsultation: number;
  averageRating: number;
  totalRatings: number;
  currency: string;
  gender: string;
  specializations: Specialization[];
  certifications: Certification[];
}
