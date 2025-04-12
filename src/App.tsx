import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PaymentFailure from './main/resources/Commons/PaymentFailure';
import PaymentSuccess from './main/resources/Commons/PaymentSuccess';
import { CompleteSignUp } from './main/resources/ConsultantSingUp/CompleteSignUp';
import SignUpConsultant from './main/resources/ConsultantSingUp/SignUpConsultant';
import { FindAGym } from './main/resources/FindAGym';
import { FindATrainer } from './main/resources/FindATrainer/FindATrainer';
import { TrainerDetailsCard } from './main/resources/FindATrainer/TrainerDetailsCard';
import GetADayPassPage from './main/resources/GetADayPassPage/GetADayPassPage';
import GymPage from './main/resources/GymResults/GymPage';
import HomePage from './main/resources/HomePage';
import { Layout } from './main/resources/Layout/Layout';
import MyProfile from './main/resources/MyProfile/MyProfile';
import SignIn from './main/resources/SignIn';
import SignUp from './main/resources/SignUp';
import BecomeAMemberPage from './main/resources/BecomeAMemberPage/BecomeAMemberPage';
import ConsultantProfile from './main/resources/MyProfile/ConsultantProfile';
import BookAppointmentPage from './main/resources/BookAppointmentPage/BookAppointmentPage';
import About from './main/resources/About';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

export const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<Layout component={<HomePage />} />}></Route>
        <Route path="/about" element={<Layout component={<About />} />}></Route>
        <Route
          path="/signin"
          element={<Layout component={<SignIn />} />}
        ></Route>
        <Route
          path="/signup"
          element={<Layout component={<SignUp />} />}
        ></Route>
        <Route
          path="/signupConsultant"
          element={<Layout component={<SignUpConsultant />} />}
        ></Route>
        <Route
          path="/signupConsultant/:confirmationCode"
          element={<Layout component={<CompleteSignUp />} />}
        ></Route>
        <Route
          path="/findAGym"
          element={<Layout component={<FindAGym />} />}
        ></Route>
        <Route
          path="/gymDetails"
          element={<Layout component={<GymPage />} />}
        ></Route>
        <Route
          path="/findATrainer"
          element={<Layout component={<FindATrainer role="TRAINER" />} />}
        ></Route>
        <Route
          path="/findADietician"
          element={<Layout component={<FindATrainer role="DIETITIAN" />} />}
        ></Route>
        <Route
          path="/profile"
          element={<Layout component={<MyProfile />} />}
        ></Route>
        <Route
          path="/consultantProfile"
          element={<Layout component={<ConsultantProfile />} />}
        ></Route>
        <Route
          path="/trainerDetails/:trainerIdParams"
          element={<Layout component={<TrainerDetailsCard />} />}
        ></Route>
        <Route
          path="/getADayPass"
          element={<Layout component={<GetADayPassPage />} />}
        ></Route>
        <Route
          path="/bookAppointment"
          element={<Layout component={<BookAppointmentPage />} />}
        ></Route>
        <Route
          path="/becomeAMember"
          element={<Layout component={<BecomeAMemberPage />} />}
        ></Route>
        <Route
          path="/success"
          element={<Layout component={<PaymentSuccess />} />}
        ></Route>
        <Route
          path="/failure"
          element={<Layout component={<PaymentFailure />} />}
        ></Route>
      </Routes>
    </Elements>
  );
};

export default App;
