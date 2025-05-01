import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Container, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion'; // Import framer-motion for animations

// Import your logo
import logo from '../../../assets/logo.png'; // You may need to adjust this path

// Define the type for our content items
interface FeaturedContent {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
}

// Sample content data - in a real application, this would likely come from props or an API
const featuredContents: FeaturedContent[] = [
  {
    id: 1,
    title: "Proper diet tips and tricks part 2.",
    description: "Learn from expert on how maintain a proper diet and stay healthy and fit in your life",
    imageUrl: "../../../assets/diet.png", // Adjust this path as needed
    bgColor: "#69B1FF" // Blue color from the image
  },
  {
    id: 2,
    title: "Exercise routines for beginners",
    description: "Start your fitness journey with these simple exercises designed for beginners",
    imageUrl: "../../../assets/exercise.png",
    bgColor: "#FF7E35" // Orange color
  },
  {
    id: 3,
    title: "Mental health and fitness",
    description: "Discover the connection between mental wellbeing and physical fitness",
    imageUrl: "../../../assets/mental.png",
    bgColor: "#FF7E35" // Orange color
  }
];

// Create a motion-compatible version of Material UI's Box
const MotionBox = motion(Box);

const FeaturedContentSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('lg'));

  // Get previous, current, and next content based on currentIndex
  const currentContent = featuredContents[currentIndex];
  const prevIndex = currentIndex === 0 ? featuredContents.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === featuredContents.length - 1 ? 0 : currentIndex + 1;
  const prevContent = featuredContents[prevIndex];
  const nextContent = featuredContents[nextIndex];

  const handlePrev = (): void => {
    if (isAnimating) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? featuredContents.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = (): void => {
    if (isAnimating) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredContents.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  // Animation variants
  const boxVariants = {
    initial: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? -20 : 20,
      opacity: 0.9,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? 20 : -20,
      opacity: 0.9,
      transition: { duration: 0.5 }
    })
  };

  return (
    <Box sx={{ 
      bgcolor: '#333333', 
      minHeight: '100vh',
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 4 },
      position: 'relative',
      overflow: 'hidden',
      mt: 4
    }}>
      {/* Left Orange Card (Partially Visible) - only show on larger screens */}
      {!isTablet && (
        <MotionBox 
          custom={direction}
          variants={boxVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          sx={{ 
            position: 'absolute',
            left: -60,
            top: '50%',
            transform: 'translateY(-50%)',
            width: { md: 160, lg: 200 },
            height: { md: 290, lg: 350 },
            bgcolor: prevContent.bgColor,
            borderRadius: 4,
            display: { xs: 'none', md: 'block' }
          }} 
        />
      )}

      {/* Featured Content Title */}
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white', 
            fontWeight: 500,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
            mb: { xs: 5, sm: 7, md: 9 },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Featured contents
        </Typography>

        {/* Main Content Area - adjusted to match the image proportions */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          {/* Left Orange Card - only shown on medium screens and up */}
          {!isMobile && !isTablet && (
            <MotionBox 
              custom={direction}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: { md: '24%' }, 
                height: { md: 290, lg: 350 },
                bgcolor: prevContent.bgColor,
                borderRadius: 4,
                mx: { sm: 1, md: 2 },
                display: { xs: 'none', md: 'block' }
              }} 
            />
          )}

          {/* Featured Content Card - resized to match image */}
          <Paper
            component={motion.div}
            custom={direction}
            variants={{
              initial: (direction: 'left' | 'right') => ({
                x: direction === 'left' ? 100 : -100,
                opacity: 0
              }),
              animate: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5 }
              },
              exit: (direction: 'left' | 'right') => ({
                x: direction === 'left' ? -100 : 100,
                opacity: 0,
                transition: { duration: 0.5 }
              })
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            elevation={4}
            sx={{
              width: { xs: '100%', sm: '80%', md: '48%' },
              mx: { xs: 0, sm: 'auto', md: 0 },
              bgcolor: '#444444',
              borderRadius: 4,
              overflow: 'hidden',
              color: 'white',
              position: 'relative',
              pb: 5
            }}
          >
            {/* Logo and Navigation */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 2 }
            }}>
              <Box component="img" src={logo} alt="Logo" sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handlePrev} sx={{ color: 'white' }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography sx={{ 
                  mx: { xs: 1, sm: 2 }, 
                  color: 'white', 
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' }
                }}>Prev</Typography>
                <Typography sx={{ 
                  mx: { xs: 1, sm: 2 }, 
                  color: 'white', 
                  fontWeight: 500,
                  display: { xs: 'none', sm: 'block' }
                }}>Next</Typography>
                <IconButton onClick={handleNext} sx={{ color: 'white' }}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Content Image - made taller to match the image and responsive */}
            <MotionBox 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ 
                width: '90%',
                height: { xs: 180, sm: 220, md: 280 },
                mx: 'auto',
                bgcolor: currentContent.bgColor,
                borderRadius: 4,
                mb: { xs: 3, sm: 4 }
              }} 
            />

            {/* Content Text */}
            <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 2 }}>
              <Typography 
                component={motion.h5}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 1,
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                }}
              >
                {currentContent.title}
              </Typography>
              <Typography 
                component={motion.p}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                variant="body2" 
                sx={{ 
                  color: '#cccccc', 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                }}
              >
                {currentContent.description}
              </Typography>
            </Box>

            {/* Progress Indicator */}
            <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '70%', height: 4, bgcolor: '#666666', borderRadius: 2, position: 'relative' }}>
                <MotionBox 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentIndex + 1) / featuredContents.length * 100}%` }}
                  transition={{ duration: 0.5 }}
                  sx={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    bgcolor: 'white',
                    borderRadius: 2
                  }} 
                />
              </Box>
            </Box>
          </Paper>

          {/* Right Orange Card - only shown on medium screens and up */}
          {!isMobile && !isTablet && (
            <MotionBox 
              custom={direction}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: { md: '24%' }, 
                height: { md: 290, lg: 350 },
                bgcolor: nextContent.bgColor,
                borderRadius: 4,
                mx: { sm: 1, md: 2 },
                display: { xs: 'none', md: 'block' }
              }} 
            />
          )}
        </Box>

        {/* Mobile navigation cards for small screens */}
        {isTablet && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 3,
            gap: 2
          }}>
            <MotionBox 
              custom={direction}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: { xs: '45%', sm: '40%' }, 
                height: { xs: 100, sm: 150 },
                bgcolor: prevContent.bgColor,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={handlePrev}
            >
              <Typography sx={{ color: 'white', fontWeight: 500 }}>Previous</Typography>
            </MotionBox>
            
            <MotionBox 
              custom={direction}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: { xs: '45%', sm: '40%' }, 
                height: { xs: 100, sm: 150 },
                bgcolor: nextContent.bgColor,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={handleNext}
            >
              <Typography sx={{ color: 'white', fontWeight: 500 }}>Next</Typography>
            </MotionBox>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default FeaturedContentSlider;