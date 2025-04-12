import React, { useEffect, useState } from 'react';

import {
  Box,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { trainerApi } from '../../API/TrainerApi';
import { Filters } from '../Filters/TrainerFilter/Filters';
import { TrainerDescriptionCard } from './TrainerDescriptionCard';
import { TrainerDetailsCard } from './TrainerDetailsCard';

import type { Trainer } from '../Models';

interface FindATrainerProps {
  role: string;
}

const defaultTrainer: Trainer = {
  id: '',
  firstName: 'Default Name',
  lastName: 'Default Name',
  sex: 'Not Specified',
  city: 'Default',
  state: 'Default',
  country: 'Default',
  bio: 'Default',
  shortBio: 'Default',
  specializations: [],
  description: 'Default Description',
  certifications: [],
  averageRating: 0,
  totalRatings: 0,
};

export interface PageFilterProps {
  lowPrice: number;
  highPrice: number;
  specializations: string[];
}

export const FindATrainer: React.FC<FindATrainerProps> = (props) => {
  const { role } = props;
  const trainersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [trainerToDisplay, setTrainerToDisplay] =
    useState<Trainer>(defaultTrainer);
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageFilters, setPageFilters] = useState<PageFilterProps>({
    lowPrice: 0,
    highPrice: 1000,
    specializations: [],
  });

  const startIndex = (currentPage - 1) * trainersPerPage;
  const endIndex = startIndex + trainersPerPage;

  const [trainerList, setTrainerList] = useState<Trainer[]>([]);
  useEffect(() => {
    trainerApi.getTrainerListCount(role).then((response) => {
      setTotalPages(response);
    });
  }, []);

  useEffect(() => {
    trainerApi
      .getTrainerList(role, currentPage - 1, pageFilters)
      .then((response) => {
        setTrainerList(response);
        setTrainerToDisplay(response[0]);
      });
  }, [currentPage, pageFilters]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const TrainerDetailList = () => {
    return (
      <>
        {trainerList.map((trainer, index) => (
          <TrainerDescriptionCard
            key={index}
            trainer={trainer}
            setTrainerToDisplay={setTrainerToDisplay}
          />
        ))}
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalPages / 10)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
        <Typography
          marginBottom="10px"
          variant="body2"
          mt={2}
          textAlign="center"
          color="text.secondary"
        >
          Showing {startIndex + 1}-{Math.min(endIndex, trainerList.length)} of{' '}
          {trainerList.length} reviews
        </Typography>
      </>
    );
  };

  return (
    <div>
      <Filters setPageFilters={setPageFilters} />
      <Typography variant="h4" margin="10px 10px 10px 10px">
        Search Results:
      </Typography>
      <Grid container>
        <Grid
          item
          xs={isSmallScreen ? 12 : 4}
          sm={isSmallScreen ? 12 : 4}
          md={isSmallScreen ? 12 : 4}
          lg={isSmallScreen ? 12 : 4}
          style={{ overflowY: 'auto' }}
        >
          <TrainerDetailList />
        </Grid>
        <Grid
          item
          xs={isSmallScreen ? 12 : 8}
          sm={isSmallScreen ? 12 : 8}
          md={isSmallScreen ? 12 : 8}
          lg={isSmallScreen ? 12 : 8}
          style={{ overflowY: 'hidden' }}
        >
          {!isSmallScreen ? (
            <TrainerDetailsCard trainerId={trainerToDisplay.id} />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
