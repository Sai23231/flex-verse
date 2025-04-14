// import React, { useRef } from 'react';
// import { Box, Typography, Button, Container, Stack, IconButton } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import EmailIcon from '@mui/icons-material/Email';
// import { Link } from 'react-router-dom';
// import Navbar from './Navbar';
// import { mainhomepage } from '../assets';

// function HomePage() {
//   const animationRef = useRef<HTMLDivElement>(null);

//   const handleScrollClick = () => {
//     if (animationRef.current) {
//       animationRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${mainhomepage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: '100vh',
//           position: 'relative',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           px: 2,
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
//             REACH YOUR LIMITS
//           </Typography>
//           <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
//             AND GET TO THE NEXT LEVEL
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </Typography>
//           <Stack direction="row" spacing={3} justifyContent="center" mb={6}>
//             <Button component={Link} to="/about" variant="outlined" color="inherit">ABOUT US</Button>
//             <Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#f4511e' } }}>JOIN NOW</Button>
//           </Stack>
//         </Container>

//         {/* SOCIAL & SCROLL */}
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 30,
//             width: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 2,
//           }}
//         >
//           <Box>
//             <Typography variant="subtitle2" sx={{ letterSpacing: 2, mb: 1 }}>SOCIAL</Typography>
//             <Stack direction="row" spacing={2} justifyContent="center"
//               sx={{
//                 '& .MuiIconButton-root': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
//                 }
//               }}
//             >
//               <IconButton sx={{ color: 'white' }}><FacebookIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><InstagramIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><TwitterIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><EmailIcon /></IconButton>
//             </Stack>
//           </Box>

//           <Box
//             onClick={handleScrollClick}
//             sx={{
//               cursor: 'pointer',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               transition: 'transform 0.3s ease',
//               '&:hover': { transform: 'translateY(5px)' }
//             }}
//           >
//             <Typography variant="caption" sx={{ mb: 1 }}>SCROLL DOWN</Typography>
//             <Box
//               sx={{
//                 width: 12,
//                 height: 12,
//                 borderLeft: '2px solid white',
//                 borderBottom: '2px solid white',
//                 transform: 'rotate(-45deg)',
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>

//       {/* 🔥 Animated FlexVerse-Like Section */}
//       <Box
//         ref={animationRef}
//         sx={{
//           height: '100vh',
//           bgcolor: 'black',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           textAlign: 'center',
//           px: 3,
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             fontSize: { xs: '40px', sm: '80px' },
//             fontWeight: 'bold',
//             background: 'linear-gradient(to right, #00ffe7, #9f00ff)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             animation: 'fadeInUp 1.2s ease forwards',
//           }}
//         >
//           WELCOME TO FLEXVERSE
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             mt: 3,
//             maxWidth: 600,
//             color: '#bbb',
//             fontSize: '18px',
//             animation: 'fadeInUp 1.8s ease forwards',
//           }}
//         >
//           Your future in fitness begins here — with immersive experiences, AI coaches, and futuristic workouts.
//         </Typography>
//       </Box>

//       {/* Add animation keyframes */}
//       <style>
//         {`
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default HomePage;
// import React from 'react';
// import { Box, Typography, Button, Container, Stack, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import EmailIcon from '@mui/icons-material/Email';
// import { motion } from 'framer-motion';
// import Navbar from './Navbar';
// import { mainhomepage } from '../assets';

// function HomePage() {
//   const flexVerseRef = React.useRef<HTMLDivElement>(null);

//   const handleScrollClick = () => {
//     flexVerseRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <>
//       <Navbar />
//       {/* Hero Section */}
//       <Box
//         sx={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${mainhomepage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           height: '100vh',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           textAlign: 'center',
//           px: 2,
//           position: 'relative',
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
//             REACH YOUR LIMITS
//           </Typography>
//           <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
//             AND GET TO THE NEXT LEVEL
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </Typography>
//           <Stack direction="row" spacing={3} justifyContent="center" mb={6}>
//             <Button component={Link} to="/about" variant="outlined" color="inherit">ABOUT US</Button>
//             <Button component={Link} to="/register" variant="contained" sx={{ backgroundColor: '#ff7043', '&:hover': { backgroundColor: '#f4511e' } }}>JOIN NOW</Button>
//           </Stack>
//         </Container>

//         {/* Social Icons + Scroll Down */}
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 30,
//             width: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             gap: 2,
//           }}
//         >
//           <Box>
//             <Typography variant="subtitle2" sx={{ letterSpacing: 2, mb: 1 }}>SOCIAL</Typography>
//             <Stack direction="row" spacing={2}>
//               <IconButton sx={{ color: 'white' }}><FacebookIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><InstagramIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><TwitterIcon /></IconButton>
//               <IconButton sx={{ color: 'white' }}><EmailIcon /></IconButton>
//             </Stack>
//           </Box>

//           <Box
//             onClick={handleScrollClick}
//             sx={{
//               cursor: 'pointer',
//               mt: 2,
//               '&:hover': { transform: 'translateY(5px)', transition: '0.3s' }
//             }}
//           >
//             <Typography variant="caption" sx={{ mb: 1 }}>SCROLL DOWN</Typography>
//             <Box
//               sx={{
//                 width: 12,
//                 height: 12,
//                 borderLeft: '2px solid white',
//                 borderBottom: '2px solid white',
//                 transform: 'rotate(-45deg)',
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>

//       {/* FlexVerse Animation Section */}
//       <Box
//         ref={flexVerseRef}
//         sx={{
//           height: '100vh',
//           background: 'linear-gradient(to right, #1e1e1e, #333)',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           color: 'white',
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.5, ease: 'easeInOut' }}
//         >
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 'bold',
//               letterSpacing: 4,
//               background: 'linear-gradient(to right, #ffa726, #42a5f5)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 3
//             }}
//           >
//             FLEX-VERSE
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           <Typography variant="subtitle1">
//             Become the best version of yourself
//           </Typography>
//         </motion.div>
//       </Box>
//     </>
//   );
// }

// export default HomePage;
import React, { useRef } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import Navbar from './Navbar';
import HeroPane from './HeroPane';

function HomePage() {
  const flexVerseRef = useRef<HTMLDivElement>(null);
  const [showFlexVerse, setShowFlexVerse] = React.useState(false);

  const handleScrollClick = () => {
    flexVerseRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => setShowFlexVerse(true), 500); // animation after scroll
  };

  return (
    <>
      <Navbar />
      <HeroPane onScrollClick={handleScrollClick} />

      {/* FlexVerse Animation Section */}
      <Box
        ref={flexVerseRef}
        sx={{
          height: '100vh',
          background: 'radial-gradient(circle at center, #1a1a1a, #000)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Fade in={showFlexVerse} timeout={1000}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #00BE6E, #1FA2FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '48px', md: '80px' },
              textAlign: 'center',
            }}
          >
            FLEX-VERSE
          </Typography>
        </Fade>
        <Fade in={showFlexVerse} timeout={2000}>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              fontSize: { xs: '16px', md: '24px' },
              textAlign: 'center',
              opacity: 0.8,
            }}
          >
            Become the best version of yourself
          </Typography>
        </Fade>
      </Box>
    </>
  );
}

export default HomePage;
