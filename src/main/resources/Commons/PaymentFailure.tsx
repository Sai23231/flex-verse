// import {Button, Center, Heading, Text, VStack} from "@chakra-ui/react";
import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentFailure() {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate('/');
  };

  return <div></div>;
}

export default PaymentFailure;
