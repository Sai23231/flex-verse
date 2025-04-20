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
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
];

const GymFinder = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Left Side - Gym List */}
      <Box
        sx={{
          width: '40%',
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#fff',
        }}
      >
        <Button
          variant="text"
          sx={{
            mb: 2,
            textAlign: 'left',
          }}
        >
          ← Back to Homepage
        </Button>
        {gyms.map((gym, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <CardMedia
                component="img"
                image={gym.image}
                sx={{
                  width: 120,
                  height: 100,
                  borderRadius: 2,
                  m: 1,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {gym.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {gym.address}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                  }}
                >
                  Fees per month: {gym.fees}
                </Typography>
                <Typography> Distance: {gym.distance} </Typography>
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

      {/* Right Side - Map and Filters */}
      <Box
        sx={{
          width: '60%',
          position: 'relative',
        }}
      >
        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            p: 2,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Fees</InputLabel>
            <Select defaultValue={1}>
              <MenuItem value={1}>2000 - 4000</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Distance</InputLabel>
            <Select defaultValue={1}>
              <MenuItem value={1}>2KM - 3KM</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel>Cardio</InputLabel>
            <Select defaultValue={1}>
              <MenuItem value={1}>Yes</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">Search</Button>
          <Button variant="outlined">Clear Filters</Button>
        </Box>

        {/* Map */}
        <Box sx={{ height: '100%', width: '100%' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Las_Vegas_Locator_Map.svg/1200px-Las_Vegas_Locator_Map.svg.png"
            alt="Map"
            style={{
              width: '100%',
              height: 'calc(100% - 80px)',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GymFinder;
