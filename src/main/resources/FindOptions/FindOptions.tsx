import './FindOptions.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Grid } from '@mui/material';

import SearchBar from '../SearchBar';

interface Option {
  title: string;
  route: string;
}

const FindOptions: React.FC = () => {
  const navigate = useNavigate();
  const options: Option[] = [
    {
      title: 'Find A Trainer',
      route: 'findATrainer',
    },
    {
      title: 'Find A Gym',
      route: '',
    },
    {
      title: 'Find A Dietician',
      route: 'findADietician',
    },
  ];

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleFindGymClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleOtherClick = (prop: Option) => {
    setShowSearchBar(false);
    handleOptionLeave();
    if (prop.route != '') navigate(`/${prop.route}`);
    else handleFindGymClick();
  };

  const handleOptionHover = (title: string) => {
    setHoveredOption(title);
  };

  const handleOptionLeave = () => {
    setHoveredOption(null);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {options.map((option, index) => (
          <Grid item key={index}>
            <div
              className="option-container"
              onMouseEnter={() => handleOptionHover(option.title)}
              onMouseLeave={handleOptionLeave}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleOtherClick(option);
                }}
                sx={{
                  width: '220px',
                  height: '60px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  borderColor: 'white',
                  borderWidth: '2px',
                  borderRadius: '30px',
                  transition: 'transform 0.3s, border-color 0.3s',
                }}
              >
                {option.title}
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
      {showSearchBar && <SearchBar handleFindGymClick={handleFindGymClick} />}
    </Container>
  );
};

export default FindOptions;
