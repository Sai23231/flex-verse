import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ArrowBack, Clear } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gyms = [
  {
    name: '9Round Kickboxing Fitness',
    address: '430 W Pico Blvd, Los Angeles, CA 90015, United States',
    fees: '1500$',
    distance: '2km',
    facilities: ['Cardio', 'Changing room', 'Parking', 'Trainer'],
    image: 'https://source.unsplash.com/random/200x150?gym1',
  },
  {
    name: 'Barbell Brigade Gym',
    address: '430 W Pico Blvd, Los Angeles, CA 90015, United States',
    fees: '2000$',
    distance: '3km',
    facilities: ['Cardio', 'Changing room', 'Parking'],
    image: 'https://source.unsplash.com/random/200x150?gym2',
  },
  {
    name: 'Speakeasy Fitness - Los Angeles',
    address: '430 W Pico Blvd, Los Angeles, CA 90015, United States',
    fees: '1500$',
    distance: '4.5km',
    facilities: ['Cardio', 'Changing room', 'Parking', 'Trainer'],
    image: 'https://source.unsplash.com/random/200x150?gym3',
  },
  {
    name: '9Round Kickboxing Fitness',
    address: '430 W Pico Blvd, Los Angeles, CA 90015, United States',
    fees: '1500$',
    distance: '2km',
    facilities: ['Cardio', 'Changing room', 'Parking', 'Trainer'],
    image: 'https://source.unsplash.com/random/200x150?gym1',
  },
];

const GymFinder = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.scrollTo({
      top: 0,
    });
    navigate('/user');
  };
  if (!isLoaded)
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 2,
          marginLeft: '2rem',
          overflow: 'hidden',
        }}
      >
        <Button
          variant="text"
          onClick={handleNavigate}
          sx={{
            mb: 2,
            textAlign: 'left',
            color: 'black',
          }}
        >
          <ArrowBack sx={{ mr: 1 }} />
          Back to Homepage
        </Button>
        <Grid container>
          {/* Right Side (on desktop) - Filters & Map */}
          <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
            {/* Filters */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: { xs: 'center', md: 'end' },
                alignItems: 'center',
                backgroundColor: '#fff',
                p: 2,
                borderRadius: 1,
                mb: 2,
                ml: 2,
              }}
            >
              <FormControl variant="standard" sx={{ minWidth: 100 }}>
                <InputLabel sx={{ fontSize: '1.2rem' }}>Fees</InputLabel>
                <Select defaultValue={1}></Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 100 }}>
                <InputLabel sx={{ fontSize: '1.2rem' }}>Distance</InputLabel>
                <Select defaultValue={1}></Select>
              </FormControl>
              <FormControl variant="standard" sx={{ minWidth: 100 }}>
                <InputLabel sx={{ fontSize: '1.2rem' }}>Cardio</InputLabel>
                <Select defaultValue={1}></Select>
              </FormControl>
              <Button
                sx={{
                  bgcolor: '#f3f4f4',
                  color: 'black',
                  py: '1.5rem',
                  px: '1rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              ></Button>
              <Button
                sx={{
                  bgcolor: '#f3f4f4',
                  color: 'black',
                  py: '1.5rem',
                  px: '1rem',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              ></Button>
            </Box>
            {/* Map */}
            <Box
              sx={{
                height: { xs: '300px', md: 'calc(100vh - 200px)' },
                width: '100%',
                bgcolor: 'rgba(74, 79, 75, 0.3)',
              }}
            ></Box>
          </Grid>
          {/* Left Side (on desktop) - Gym List */}
          <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflowY: 'auto',
                padding: '1rem',
                maxHeight: '100vh',
              }}
            >
              <Box minHeight={'100vh'}></Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 2,
        marginLeft: '2rem',
        overflow: 'hidden',
      }}
    >
      <Button
        variant="text"
        onClick={handleNavigate}
        sx={{
          mb: 2,
          textAlign: 'left',
          color: 'black',
        }}
      >
        <ArrowBack sx={{ mr: 1 }} />
        Back to Homepage
      </Button>
      <Grid container spacing={1}>
        {/* Right Side (on desktop) - Filters & Map */}
        <Grid item xs={12} md={7} order={{ xs: 1, md: 2 }}>
          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: { xs: 'center', md: 'end' },
              alignItems: 'center',
              backgroundColor: '#fff',
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel sx={{ fontSize: '1.2rem' }}>Fees</InputLabel>
              <Select defaultValue={1}>
                <MenuItem value={1}>2000 - 4000</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel sx={{ fontSize: '1.2rem' }}>Distance</InputLabel>
              <Select defaultValue={1}>
                <MenuItem value={1}>2KM - 3KM</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <InputLabel sx={{ fontSize: '1.2rem' }}>Cardio</InputLabel>
              <Select defaultValue={1}>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </FormControl>
            <Button
              sx={{
                bgcolor: '#f3f4f4',
                color: 'black',
                py: '0.8rem',
                px: '1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              Search
            </Button>
            <Button
              sx={{
                bgcolor: '#f3f4f4',
                color: 'black',
                py: '0.8rem',
                px: '1rem',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Clear sx={{ fontSize: '1.5rem', mr: 1 }} />
              Clear Filters
            </Button>
          </Box>
          {/* Map */}
          <Box
            sx={{
              height: { xs: '300px', md: 'calc(100vh - 200px)' },
              width: '100%',
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Las_Vegas_Locator_Map.svg/1200px-Las_Vegas_Locator_Map.svg.png"
              alt="Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 10,
              }}
            />
          </Box>
        </Grid>
        {/* Left Side (on desktop) - Gym List */}
        <Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              overflowY: 'auto',
              padding: '1rem',
              maxHeight: '100vh',
            }}
          >
            {gyms.map((gym, index) => (
              <Card
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CardMedia
                    component="img"
                    image={gym.image}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      m: 1,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {gym.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {gym.address}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      Fees per month: {gym.fees}
                    </Typography>
                    <Typography>Distance: {gym.distance}</Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                      }}
                    >
                      {gym.facilities.map((facility, i) => (
                        <Chip
                          key={i}
                          label={facility}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GymFinder;
