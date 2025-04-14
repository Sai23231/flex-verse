// import React from 'react';
// import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
// import { Facebook, Instagram, Twitter, Email } from '@mui/icons-material';

// export const HeroPane = () => {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         background: 'transparent',
//         display: 'flex',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         pr: { xs: 3, sm: 10 },
//         pb: { xs: 6, sm: 10 }, // Add bottom padding to prevent overlap
//         textAlign: 'right',
//       }}
//     >
//       <Box>
//         <Typography
//           variant="h2"
//           sx={{
//             fontFamily: 'Helvetica',
//             fontWeight: 'bold',
//             fontSize: { xs: '40px', sm: '80px' },
//             color: 'white',
//             lineHeight: { xs: '60px', sm: '90px' },
//             mb: 2,
//           }}
//         >
//           <span style={{ color: '#00BE6E' }}>Become</span> the best<br />
//           version of <span style={{ color: '#00BE6E' }}>Yourself</span>
//         </Typography>

//         <Typography
//           variant="body1"
//           sx={{
//             color: 'white',
//             fontSize: '18px',
//             lineHeight: '30px',
//             maxWidth: '600px',
//             mb: 4,
//           }}
//         >
//           The ultimate platform to reach your fitness goals. Get customized workout plans, diets tailored to your preference, and expert counselling here. Or, find a gym near you, take a virtual tour, and join online.
//         </Typography>

//         <Stack direction="row" spacing={2} justifyContent="flex-end" mb={6}>
//           <Button variant="outlined" color="inherit">ABOUT US</Button>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#00BE6E',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#00a75f',
//               },
//             }}
//           >
//             JOIN NOW
//           </Button>
//         </Stack>

//         {/* SOCIAL Section */}
//         <Box mt={8}>
//           <Typography
//             variant="subtitle2"
//             sx={{
//               color: 'white',
//               letterSpacing: 2,
//               mb: 3,
//             }}
//           >
//             SOCIAL
//           </Typography>
//           <Stack direction="row" spacing={2} justifyContent="flex-end">
//             <IconButton sx={{ color: 'white' }}><Facebook /></IconButton>
//             <IconButton sx={{ color: 'white' }}><Instagram /></IconButton>
//             <IconButton sx={{ color: 'white' }}><Twitter /></IconButton>
//             <IconButton sx={{ color: 'white' }}><Email /></IconButton>
//           </Stack>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
import React from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, Email } from '@mui/icons-material';

interface HeroPaneProps {
  onScrollClick: () => void;
}

const HeroPane: React.FC<HeroPaneProps> = ({ onScrollClick }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pr: { xs: 3, sm: 10 },
        pb: { xs: 6, sm: 10 },
        textAlign: 'right',
        position: 'relative',
        color: 'white',
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '40px', sm: '80px' },
            lineHeight: { xs: '60px', sm: '90px' },
            mb: 2,
          }}
        >
          <span style={{ color: '#00BE6E' }}>Become</span> the best<br />
          version of <span style={{ color: '#00BE6E' }}>Yourself</span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '18px',
            lineHeight: '30px',
            maxWidth: '600px',
            mb: 4,
          }}
        >
          The ultimate platform to reach your fitness goals. Get customized workout plans, diets tailored to your preference, and expert counselling here. Or, find a gym near you, take a virtual tour, and join online.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mb={6}>
          <Button variant="outlined" color="inherit">ABOUT US</Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00BE6E',
              color: 'white',
              '&:hover': {
                backgroundColor: '#00a75f',
              },
            }}
          >
            JOIN NOW
          </Button>
        </Stack>

        {/* Social Media Icons */}
        <Box mt={8}>
          <Typography
            variant="subtitle2"
            sx={{
              letterSpacing: 2,
              mb: 3,
            }}
          >
            SOCIAL
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <IconButton sx={{ color: 'white' }}><Facebook /></IconButton>
            <IconButton sx={{ color: 'white' }}><Instagram /></IconButton>
            <IconButton sx={{ color: 'white' }}><Twitter /></IconButton>
            <IconButton sx={{ color: 'white' }}><Email /></IconButton>
          </Stack>
        </Box>

        {/* Scroll Button */}
        <Box
          onClick={onScrollClick}
          sx={{
            mt: 6,
            cursor: 'pointer',
            display: 'inline-block',
            color: 'white',
            '&:hover': { transform: 'translateY(4px)', transition: '0.3s' },
          }}
        >
          <Typography variant="caption">SCROLL DOWN</Typography>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderLeft: '2px solid white',
              borderBottom: '2px solid white',
              transform: 'rotate(-45deg)',
              mx: 'auto',
              mt: 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroPane;
