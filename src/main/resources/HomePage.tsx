import React, { useState, useEffect, useRef, Fragment } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  CssBaseline,
  Paper,
  TextField,
  Link,
  Container,
  Hidden,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  Email,
  Menu,
  Close,
  KeyboardArrowDown,
  LinkedIn,
  PlayArrow,
} from '@mui/icons-material';
import { useIsAuthenticated } from 'react-auth-kit';
import { motion, AnimatePresence } from 'framer-motion';

import manTakingHeaviestWeight2 from '../assets/manTakingHeaviestWeight2.png';
import athleticManWomanWithDumbbellsTrainingPracticingGym2 from '../assets/athleticManWomanWithDumbbellsTrainingPracticingGym2.png';
import sideViewWomanDoingSportWithStats2 from '../assets/sideViewWomanDoingSportWithStats2.png';
import footerBlackBg from '../assets/footerBlackBg.png';
import footerText from '../assets/footerText.png';
import footerBlueGrad from '../assets/footerBlueGrad.png';
import footerOrangeGrad from '../assets/footerOrangeGrad.png';
import newsLetter from '../assets/newsLetter.png';

import { mainhomepage } from '../assets';
import { ListingCarousel } from './Commons/ListingCarousel';
import FindOptions from './FindOptions/FindOptions';

/** Responsive NavBar component */
function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navItems = ['HOME', 'STORE', 'BLOGS', 'ABOUT US', 'CONTACT US'];
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Fragment>
      {isMobile ? (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1100,
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#FFC107',
            }}
          >
            FLEX‑VERSE
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Menu />
          </IconButton>
        </Box>
      ) : (
        <Stack direction="row" spacing={4} sx={{ fontWeight: 600, mb: 4 }}>
          {navItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                cursor: 'pointer',
                color: item === 'HOME' ? '#FFC107' : 'inherit',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -2,
                  width: '100%',
                  height: '2px',
                  backgroundColor: '#FFC107',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                  transformOrigin: 'left',
                },
              }}
            >
              <Typography>{item}</Typography>
            </Box>
          ))}
        </Stack>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '70%',
            backgroundColor: '#1e2539',
            color: 'white',
          },
        }}
      >
        <Box sx={{ textAlign: 'right', p: 1 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding onClick={handleDrawerToggle}>
              <ListItemButton>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  );
}

/** Custom hook to calculate scroll progress for a given ref. */
function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      const scrolledIntoSection = windowHeight - rect.top;
      const rawProgress = scrolledIntoSection / (windowHeight + sectionHeight);
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}

/** FLEX‑VERSE Section with scroll-based animation */
function FlexVerseSection({ progress = 0 }) {
  // Mapping progress values smoothly
  const blurValue = 50 * progress;
  // Calculate scale based on scroll progress (3x to minimum scale)
  const minScale = 0.667; // This ensures minimum size of 80px (80/120 = 0.667)
  const scaleValue = Math.max(3 - 2 * progress, minScale);
  // Enhanced overlay opacity for darker tint
  const overlayOpacity = 0.2 + 0.6 * progress;
  // Calculate if we should stick based on text size
  const shouldStick = progress < 0.95; // Keep sticky until very end of scroll
  // Calculate text animations based on FLEX-VERSE progress
  const flexVerseProgress = progress;
  const showSubtitles = flexVerseProgress >= 0.5;
  // Calculate section height and opacity
  const sectionHeight = progress > 0.9 ? '60vh' : '100vh';
  const contentOpacity = progress >= 0.95 ? 0 : 1; // Keep content visible until end
  return (
    <Box
      sx={{
        position: shouldStick ? 'sticky' : 'relative',
        top: 0,
        height: sectionHeight,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        transition: 'height 0.8s ease-in-out',
        opacity: contentOpacity,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: `blur(${blurValue}px)`,
          WebkitBackdropFilter: `blur(${blurValue}px)`,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 1,
          transition: 'backdrop-filter 0.3s ease-out',
        },
      }}
    >
      {/* Dark Overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      {/* FLEX‑VERSE Text */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          scale: scaleValue,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'transparent',
            fontWeight: 600,
            fontSize: {
              xs: 'clamp(80px, 4rem, 4rem)',
              sm: 'clamp(80px, 6rem, 6rem)',
              md: 'clamp(80px, 8rem, 8rem)',
            },
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            userSelect: 'none',
            WebkitTextStroke: '2px white',
            background: 'transparent',
            mixBlendMode: 'normal',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            },
          }}
        >
          FLEX‑VERSE
        </Typography>
      </motion.div>
      {/* Descriptive Lines with Enhanced Animation */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          overflow: 'hidden',
          mt: 4,
        }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: showSubtitles ? 0 : 100,
            opacity: showSubtitles ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              mb: 2,
              fontWeight: 300,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Become the best version of yourself
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: showSubtitles ? 0 : 100,
            opacity: showSubtitles ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '2rem', sm: '2.5rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Our services
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}

const SequencedScrollReveal = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      {step >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: 'white',
              mt: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            Become the best version of yourself
          </Typography>
        </motion.div>
      )}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              color: 'white',
              borderColor: 'white',
              fontWeight: 'bold',
              px: { xs: 3, sm: 4 },
              py: 1.5,
              borderRadius: '999px',
              fontSize: { xs: '1rem', sm: '1.2rem' },
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.05)',
              },
            }}
          >
            Our Services
          </Button>
        </motion.div>
      )}
    </>
  );
};

/** Main HomePage Component */
function HomePage() {
  const isAuthenticated = useIsAuthenticated();
  const [scrollY, setScrollY] = useState(0);
  const [locked, setLocked] = useState(true);
  const [selectedFaq, setSelectedFaq] = React.useState(0);
  const [percent, setPercent] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  // Refs for tracking sections
  const heroRef = useRef(null);
  const flexVerseRef = useRef(null);
  // Calculate scroll progress for FLEX‑VERSE section
  const flexVerseProgress = useScrollProgress(flexVerseRef);
  // Global scroll tracking for background zoom
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setLocked(false), 2000); // Lock for 2 seconds on page load
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  const maxScroll = 300;
  const scale = scrollY < maxScroll ? 1 + (scrollY / maxScroll) * 0.2 : 1.2;
  const opacity = scrollY < maxScroll ? 1 - scrollY / maxScroll : 0;
  //Horizontal Scroll
  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        if (boxRef.current) {
          const offset = boxRef.current.offsetTop;
          let percentage =
            ((window.scrollY - offset) / window.innerHeight) * 100;
          percentage = Math.min(Math.max(percentage, 0), 200);
          setPercent(percentage);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  const testimonials = [
    {
      id: 1,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
    {
      id: 2,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
    {
      id: 3,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
    {
      id: 4,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
    {
      id: 5,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
    {
      id: 6,
      date: 'october 8, 2024',
      text: 'Flex verse offers a really great service. love it guys. 10 start for you !!',
    },
  ];
  const faqItems = [
    {
      question: 'What is Flex-verse ?',
      answer:
        'Flex-verse is a Platform which offers multiple features for you to stay fit and healthy.',
    },
    {
      question: 'Do I have to pay for something ?',
      answer:
        'Our basic services are free, but premium features require a subscription.',
    },
    {
      question: 'How to register as a trainer ?',
      answer:
        'Go to our "Join Us" section and select "Register as a Trainer" to complete the application.',
    },
    {
      question: 'Is there any subscription fee ?',
      answer:
        'Yes, we offer both free and premium subscription plans to meet different needs.',
    },
    {
      question: 'Other...',
      answer: 'Please contact our support team for any other questions.',
    },
  ];
  const handleFaqClick = (index: number) => {
    setSelectedFaq(index);
  };
  return (
    <>
      {/* Screen Lock Overlay */}
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '110vh',
              width: '100vw',
              backgroundColor: '#000',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
            }}
          >
            Welcome to FLEX‑VERSE
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Image with Zoom Effect */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${mainhomepage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease-out',
          zIndex: -1,
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            // width: '100%',
            height: '100%',
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      />
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: opacity, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Box
          sx={{
            position: 'relative',
            minHeight: '90vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            py: 3,
          }}
        >
          {/* NavBar (Responsive) */}
          <NavBar />
          {/* Hero Content */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: 'md',
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.75rem',
                  sm: '2.5rem',
                },
              }}
            >
              REACH YOUR LIMITS
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.75rem',
                  sm: '2.5rem',
                },
              }}
            >
              AND GET TO THE NEXT LEVEL
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                }}
              >
                ABOUT US
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFA76D',
                  color: 'black',
                  '&:hover': { backgroundColor: '#ff8c42' },
                }}
              >
                JOIN NOW
              </Button>
            </Stack>
          </Box>
          {/* Social Icons & Scroll Down */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 1 }}>
              SOCIAL
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <IconButton color="inherit" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Email />
              </IconButton>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                SCROLL DOWN
              </Typography>
              <KeyboardArrowDown
                sx={{
                  color: 'white',
                  fontSize: '2rem',
                  animation: 'bounce 2s infinite',
                }}
              />
              {/* <Box sx={{ width: '30px', height: '2px', backgroundColor: 'white', transform: 'rotate(45deg)' }} /> */}
            </Box>
          </Box>
        </Box>
      </motion.div>
      {/* FLEX‑VERSE Section */}
      <Box ref={flexVerseRef} sx={{ height: '250vh', position: 'relative' }}>
        <FlexVerseSection progress={flexVerseProgress} />
      </Box>
      {/* Add keyframes for bounce animation */}
      <Box
        sx={{
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0)',
            },
            '40%': {
              transform: 'translateY(10px)',
            },
            '60%': {
              transform: 'translateY(5px)',
            },
          },
        }}
      />
      {/* Scroll Section */}
      <Box
        ref={boxRef}
        sx={{
          height: '300vh',
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <Box
            sx={{
              transform: `translate3d(-${
                percent < 200 ? percent : 200
              }vw, 0, 0)`,
              position: 'absolute',
              top: 0,
              height: '100%',
              width: '300vw',
              willChange: 'transform',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Section 1 */}
            <Box
              sx={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                px: 8,
                py: 5,
                dropShadow: '-10px 10px 10px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 4,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <Grid container>
                  {/* Left Image */}
                  <Grid item xs={12} md={7}>
                    <Box
                      sx={{
                        backgroundImage: `linear-gradient(rgba(112, 177, 255, 0.25), rgba(112, 177, 255, 0.25)), url(${manTakingHeaviestWeight2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    ></Box>
                  </Grid>
                  {/* Right Text */}
                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      backgroundColor: '#FF9960',
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontFamily="Poppins"
                      fontWeight="700"
                      fontSize={{
                        lg: '100px',
                        md: '80px',
                        sm: '60px',
                        xs: '40px',
                      }}
                      gutterBottom
                    >
                      GYM
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={{
                        lg: '25px',
                        md: '25px',
                        sm: '20px',
                        xs: '15px',
                      }}
                      fontWeight="500"
                      fontFamily="Poppins"
                    >
                      Find the best suitable gym according to
                      <br />
                      your budget and locality
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            {/* Section 2 */}
            <Box
              sx={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                px: 8,
                py: 5,
                boxShadow: '-10px 10px 10px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 4,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <Grid container>
                  {/* Left Image */}
                  <Grid item xs={12} md={7}>
                    <Box
                      sx={{
                        backgroundImage: `linear-gradient(rgba(228, 228, 228, 0.25), rgba(228, 228, 228, 0.25)), url(${athleticManWomanWithDumbbellsTrainingPracticingGym2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    ></Box>
                  </Grid>
                  {/* Right Text */}
                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontFamily="Poppins"
                      fontWeight="700"
                      fontSize={{
                        lg: '80px',
                        md: '60px',
                        sm: '60px',
                        xs: '40px',
                      }}
                      gutterBottom
                    >
                      TRAINER
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={{
                        lg: '25px',
                        md: '25px',
                        sm: '20px',
                        xs: '15px',
                      }}
                      fontWeight="500"
                      fontFamily="Poppins"
                    >
                      Find the best suitable trainer according to
                      <br />
                      your budget and availablity.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            {/* Section 3 */}
            <Box
              sx={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                px: 5,
                py: 5,
                boxShadow: '-10px 10px 10px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 4,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  overflow: 'hidden',
                }}
              >
                <Grid container>
                  {/* Left Image */}
                  <Grid item xs={12} md={7}>
                    <Box
                      sx={{
                        backgroundImage: `linear-gradient(rgba(254, 97, 8, 0.25), rgba(254, 97, 8, 0.25)), url(${sideViewWomanDoingSportWithStats2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    ></Box>
                  </Grid>
                  {/* Right Text */}
                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      backgroundColor: '#70B1FF',
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      fontFamily="Poppins"
                      fontWeight="700"
                      fontSize={{
                        lg: '80px',
                        md: '60px',
                        sm: '60px',
                        xs: '40px',
                      }}
                      gutterBottom
                    >
                      DIETITIAN
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={{
                        lg: '25px',
                        md: '25px',
                        sm: '20px',
                        xs: '15px',
                      }}
                      fontWeight="500"
                      fontFamily="Poppins"
                    >
                      Find the best suitable Dietitian according to
                      <br />
                      your budget and locality
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ my: 8, bgcolor: 'white' }}>
        <Typography
          variant="h4"
          fontFamily="Poppins"
          fontWeight="600"
          sx={{
            mb: 4,
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '100%',
              height: 3,
              backgroundColor: '#000',
            },
          }}
        >
          Testimonials
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  bgcolor: '#D9D9D9',
                  position: 'relative',
                  pb: 7,
                }}
              >
                <Box>
                  <Typography
                    color="orange"
                    fontFamily="Poppins"
                    fontSize="20px"
                    mb={1}
                  >
                    Posted on {testimonial.date}
                  </Typography>
                  <Typography fontFamily="Poppins" fontSize="18px">
                    {testimonial.text}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 24,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#808080',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      position: 'relative',
                      fontSize: '14px',
                    }}
                  >
                    <Box />#{testimonial.id}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* FAQ Section */}
      <Container sx={{ my: 8, bgcolor: 'white', width: 'full' }}>
        <Box
          sx={{
            border: '2px solid black',
            borderRadius: '24px',
            p: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              fontFamily="Poppins"
              fontWeight="700"
              fontSize="24px"
              color="#FF5722"
              mb={3}
            >
              FAQ
            </Typography>
            {faqItems.map((item, index) => (
              <Box
                key={index}
                onClick={() => setSelectedFaq(index)}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: selectedFaq === index ? '#78ABFF' : '#FF9D79',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '2px solid black',
                }}
              >
                <Typography
                  fontFamily="Poppins"
                  fontSize="16px"
                  color={selectedFaq === index ? 'white' : 'black'}
                >
                  {item.question}
                </Typography>
                {selectedFaq === index && (
                  <Box
                    sx={{
                      bgcolor: 'white',
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 16, color: '#78ABFF' }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography
              fontFamily="Poppins"
              fontWeight="700"
              fontSize="24px"
              color="#78ABFF"
              mb={2}
              alignSelf="center"
            >
              ANSWERS
            </Typography>
            <Box
              sx={{
                bgcolor: '#78ABFF',
                borderRadius: '12px',
                p: 6,
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid black',
              }}
            >
              <Typography
                fontFamily="Poppins"
                fontSize="18px"
                color="white"
                textAlign="center"
              >
                {faqItems[selectedFaq].answer}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      {/* Footer */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${footerBlackBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          pt: 6,
          px: { xs: 3, md: 10 },
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
          height: '100%',
          width: '100%',
          pb: {
            lg: '15%',
            md: '18%',
            sm: '18%',
            xs: '18%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'start',
            width: '100%',
            maxHeight: '60%',
          }}
        >
          <Grid
            container
            width="100%"
            columnSpacing={{ xs: 2, md: 8 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
          >
            <Grid item xs={12} md={6}>
              <Grid container>
                {/* Image */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  width={'350px'}
                  height={'auto'}
                >
                  <Box
                    component="img"
                    src={newsLetter}
                    alt="Newsletter Illustration"
                    sx={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </Grid>
                {/* Text */}
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '10%',
                      fontFamily: 'Poppins',
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                    }}
                  >
                    SUBSCRIBE TO OUR
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: {
                        xs: '35px',
                        sm: '40px',
                        md: '35px',
                        lg: '40px',
                      },
                      textDecoration: 'underline',
                      fontFamily: 'Poppins',
                      color: '#FF452B',
                      mb: 1,
                    }}
                  >
                    NEWSLETTER
                  </Typography>
                  <Typography
                    sx={{
                      color: '#ccc',
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                      textDecoration: 'underline',
                    }}
                  >
                    Get weekly updates on the latest updates about Flex-verse
                    right in your mailbox.
                    <br />
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: {
                          xs: '15px',
                          sm: '20px',
                          md: '15px',
                          lg: '18px',
                        },
                        textDecoration: 'underline',
                      }}
                    >
                      Subscribe now!
                    </Box>
                  </Typography>
                </Grid>
              </Grid>
              {/* Email input */}
              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  placeholder="Email Address"
                  variant="outlined"
                  size="small"
                  sx={{
                    bgcolor: '#fff',
                    flexGrow: 1,
                    width: { xs: '100%', sm: 'auto' },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF452B',
                    fontWeight: 'bold',
                    px: 4,
                    '&:hover': { backgroundColor: '#e03d24' },
                  }}
                >
                  SUBSCRIBE
                </Button>
              </Box>
            </Grid>
            {/* Links Section */}
            <Grid
              item
              xs={2}
              sm={6}
              md={3}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'row',
                  sm: 'row',
                  md: 'column',
                  lg: 'column',
                },
                mt: { xs: 3, md: 0 },
                justifyContent: { xs: 'space-around' },
                gap: { sm: 5 },
              }}
              width="100%"
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '700',
                    fontSize: {
                      xs: '20px',
                      sm: '25px',
                      md: '20px',
                      lg: '25px',
                    },
                    fontFamily: 'Nunito Sans',
                    textDecoration: 'underline',
                    mb: 1,
                  }}
                >
                  Join us
                </Typography>
                <Typography>
                  <Link
                    href="#"
                    underline="hover"
                    color="inherit"
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                    }}
                  >
                    Register your Gym
                  </Link>
                </Typography>
                <Typography>
                  <Link
                    href="#"
                    underline="hover"
                    color="inherit"
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                    }}
                  >
                    Careers
                  </Link>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '700',
                    fontSize: {
                      xs: '20px',
                      sm: '25px',
                      md: '20px',
                      lg: '25px',
                    },
                    fontFamily: 'Nunito Sans',
                    textDecoration: 'underline',
                    mb: 1,
                    mt: { lg: 3 },
                  }}
                >
                  Policy
                </Typography>
                <Typography>
                  <Link
                    href="#"
                    underline="hover"
                    color="inherit"
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                    }}
                  >
                    Terms and condition
                  </Link>
                </Typography>
                <Typography>
                  <Link
                    href="#"
                    underline="hover"
                    color="inherit"
                    sx={{
                      fontSize: {
                        xs: '15px',
                        sm: '20px',
                        md: '15px',
                        lg: '18px',
                      },
                    }}
                  >
                    Privacy and pilocies
                  </Link>
                </Typography>
              </Box>
            </Grid>
            {/* Social & Sign-in */}
            <Grid item xs={2} sm={3} md={3}>
              <Typography
                sx={{
                  fontFamily: 'Nunito Sans',
                  mb: 1,
                  fontSize: {
                    xs: '20px',
                    sm: '25px',
                    md: '20px',
                    lg: '25px',
                  },
                  fontWeight: '400',
                  mt: { xs: 3, md: 0 },
                }}
                textAlign={'center'}
              >
                Get in touch
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    border: '1px solid #fff',
                  }}
                >
                  <Facebook sx={{ color: '#fff', fontSize: '20px' }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: '1px solid #fff',
                  }}
                >
                  <Twitter sx={{ color: '#fff', fontSize: '20px' }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: '1px solid #fff',
                  }}
                >
                  <LinkedIn sx={{ color: '#fff', fontSize: '20px' }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: '#70B1FF',
                    fontFamily: 'Nunito Sans',
                    fontSize: '25px',
                    fontWeight: '700',
                    textDecoration: 'underline',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#70B1FF',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  SIGN-IN
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography
          align="center"
          sx={{
            mt: 6,
          }}
        >
          Copyright © 2023 Flex-Verse.com - All Rights Reserved.
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundImage: `url(${footerBlueGrad})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'end',
            height: '100%',
            width: '100%',
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundImage: `url(${footerOrangeGrad})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%',
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundImage: `url(${footerText})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: {
              lg: '120px',
              md: '120px',
              sm: '90px',
              xs: '50px',
            },
            width: {
              lg: '1000px',
              md: '970px',
              sm: '750px',
              xs: '400px',
            },
          }}
        ></Box>
      </Box>
    </>
  );
}

export default HomePage;
