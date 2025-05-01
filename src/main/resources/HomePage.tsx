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
  Container,
  Avatar,
  Grid,
  Paper,
  TextField,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useIsAuthenticated } from 'react-auth-kit';
import { motion, AnimatePresence } from 'framer-motion';

import main_homepage from '../assets/main_homepage.png';
import manTakingHeaviestWeight2 from '../assets/manTakingHeaviestWeight2.png';
import athleticManWomanWithDumbbellsTrainingPracticingGym2 from '../assets/athleticManWomanWithDumbbellsTrainingPracticingGym2.png';
import sideViewWomanDoingSportWithStats2 from '../assets/sideViewWomanDoingSportWithStats2.png';
import footerBlackBg from '../assets/footerBlackBg.png';
import footerText from '../assets/footerText.png';
import footerBlueGrad from '../assets/footerBlueGrad.png';
import footerOrangeGrad from '../assets/footerOrangeGrad.png';
import newsLetter from '../assets/newsLetter.png';
import logo from '../assets/logo.png';
import { ListingCarousel } from './Commons/ListingCarousel';
import FindOptions from './FindOptions/FindOptions';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
            p: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1100,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="FLEX-VERSE Logo"
              sx={{
                width: 32,
                height: 32,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: '#FFC107',
                fontSize: '1rem',
              }}
            >
              FLEX‑VERSE
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Menu />
          </IconButton>
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={4}
          sx={{
            fontWeight: 600,
            mb: 4,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
            width: '80%',
            maxWidth: '300px',
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="FLEX-VERSE Logo"
            sx={{
              width: 32,
              height: 32,
              objectFit: 'contain',
            }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#FFC107',
              fontSize: '1rem',
            }}
          >
            FLEX‑VERSE
          </Typography>
        </Box>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding onClick={handleDrawerToggle}>
              <ListItemButton>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    sx: { fontWeight: 'bold' },
                  }}
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Mapping progress values smoothly
  const blurValue = 50 * progress;
  // Calculate scale based on scroll progress (3x to minimum scale)
  const minScale = isMobile ? 0.4 : 0.667; // Even smaller minimum scale on mobile
  const scaleValue = Math.max(
    isMobile ? 2.2 - 1.5 * progress : 3 - 2 * progress,
    minScale
  );
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
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'transparent',
            fontWeight: 600,
            fontSize: {
              xs: 'clamp(30px, 12vw, 60px)',
              sm: 'clamp(60px, 18vw, 100px)',
              md: 'clamp(80px, 8rem, 8rem)',
            },
            textTransform: 'uppercase',
            letterSpacing: { xs: '0.05rem', sm: '0.1rem', md: '0.2rem' },
            userSelect: 'none',
            WebkitTextStroke: { xs: '1px white', sm: '2px white' },
            background: 'transparent',
            mixBlendMode: 'normal',
            textAlign: 'center',
            px: 2,
            mx: 'auto',
            width: 'fit-content',
            maxWidth: '100%',
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
          mt: { xs: 2, sm: 4 },
          px: 2,
          width: '100%',
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
              mb: { xs: 1, sm: 2 },
              fontWeight: 300,
              fontSize: { xs: '0.875rem', sm: '1.25rem', md: '1.5rem' },
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
              fontSize: { xs: '1.25rem', sm: '2rem', md: '2.5rem' },
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

/** Main HomePage Component */
function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useIsAuthenticated();
  const [scrollY, setScrollY] = useState(0);
  const [locked, setLocked] = useState(true);
  const [selectedFaq, setSelectedFaq] = React.useState(0);
  const [percent, setPercent] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/signin');
  };
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
  // Update for FLEX-VERSE section height to be smaller on mobile
  const flexVerseSectionHeight = isMobile ? '200vh' : '250vh';

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
              fontSize: isMobile ? '1.5rem' : '2rem',
              textAlign: 'center',
              padding: '0 1rem',
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
          backgroundImage: `url(${main_homepage})`,
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
            width: '100%',
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
            minHeight: '100vh',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            px: { xs: 2, sm: 3 },
            py: { xs: 4, sm: 3 },
            pt: isMobile ? '60px' : 3, // Add extra padding top for mobile to account for fixed navbar
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
              mb: { xs: 3, sm: 2 },
              mt: isMobile ? 2 : 0,
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem' },
                lineHeight: { xs: 1.2, sm: 1.3 },
                mb: { xs: 1, sm: 2 },
              }}
            >
              REACH YOUR LIMITS
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem' },
                lineHeight: { xs: 1.2, sm: 1.3 },
                mb: { xs: 1, sm: 2 },
              }}
            >
              AND GET TO THE NEXT LEVEL
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: { xs: 1, sm: 2 },
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                px: { xs: 1, sm: 0 },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.5, sm: 2 }}
              justifyContent="center"
              sx={{ mb: { xs: 3, sm: 2 } }}
            >
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                ABOUT US
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FFA76D',
                  color: 'black',
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': { backgroundColor: '#ff8c42' },
                }}
              >
                JOIN NOW
              </Button>
            </Stack>
          </Box>

          {/* Social Icons & Scroll Down */}
          <Box sx={{ textAlign: 'center', mt: { xs: 'auto', sm: 0 } }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                mb: { xs: 0.5, sm: 1 },
                fontSize: { xs: '0.75rem', sm: '1rem' },
                letterSpacing: { xs: 1, sm: 2 },
              }}
            >
              SOCIAL
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 1.5, sm: 2 }}
              justifyContent="center"
              sx={{ mb: { xs: 1.5, sm: 2 } }}
            >
              <IconButton color="inherit" size={isMobile ? 'small' : 'medium'}>
                <Facebook fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? 'small' : 'medium'}>
                <Instagram fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? 'small' : 'medium'}>
                <Twitter fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? 'small' : 'medium'}>
                <Email fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontSize: { xs: '0.7rem', sm: '0.875rem' },
                }}
              >
                SCROLL DOWN
              </Typography>
              <KeyboardArrowDown
                sx={{
                  color: 'white',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  animation: 'bounce 2s infinite',
                }}
              />
            </Box>
          </Box>
        </Box>
      </motion.div>
      {/* FLEX‑VERSE Section */}
      <Box
        ref={flexVerseRef}
        sx={{
          height: flexVerseSectionHeight,
          position: 'relative',
        }}
      >
        <FlexVerseSection progress={flexVerseProgress} />
      </Box>
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
      <Container
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: 8,
          bgcolor: '#f5f5f5',
        }}
      >
        <Typography
          variant="h4"
          fontFamily="Poppins"
          fontWeight="600"
          textAlign="center"
          sx={{
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: 4,
              backgroundColor: '#FF5722',
              borderRadius: '2px',
            },
          }}
        >
          Testimonials
        </Typography>

        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => {
            const isEven = index % 2 === 0;
            return (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      minHeight: 250,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '20px',
                      bgcolor: isEven ? '#FF9D79' : '#78ABFF',
                      textAlign: 'center',
                      color: 'white',
                      boxShadow: '0px 6px 20px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography
                      fontFamily="Poppins"
                      fontSize="16px"
                      mb={2}
                      sx={{ opacity: 0.9 }}
                    >
                      {testimonial.date}
                    </Typography>
                    <Typography
                      fontFamily="Poppins"
                      fontSize="18px"
                      fontWeight="500"
                      mb={3}
                    >
                      “{testimonial.text}”
                    </Typography>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isEven ? '#FF9D79' : '#78ABFF',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          border: `2px solid ${isEven ? '#FF9D79' : '#78ABFF'}`,
                        }}
                      >
                        #{testimonial.id}
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
      {/* FAQ Section */}
      <Container
        maxWidth={false}
        sx={{
          py: 6,
          px: { xs: 4, sm: 6, md: 12, lg: 16 },
          bgcolor: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          fontFamily="Poppins"
          fontWeight="600"
          textAlign="center"
          sx={{
            mb: 6,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: 4,
              backgroundColor: '#FF5722',
              borderRadius: '2px',
            },
          }}
        >
          FAQ's
        </Typography>

        {faqItems.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              border: '1px solid #ddd',
              borderRadius: '12px',
              '&::before': { display: 'none' },
              bgcolor: '#FF9D79',
              color: '#000',
              boxShadow: 'none',
              '&.Mui-expanded': {
                bgcolor: '#78ABFF',
                color: '#fff',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#000' }} />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
              sx={{
                fontFamily: 'Poppins',
                fontWeight: '600',
                fontSize: '18px',
              }}
            >
              {item.question}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                borderTop: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}
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
            columnSpacing={{ xs: 2, md: 5 }}
            columns={{ xs: 4, sm: 9, md: 12 }}
            px={{ xs: 4, md: 0 }}
          >
            <Grid item xs={12} md={8}>
              <Grid
                container
                sx={{
                  paddingLeft: { md: 16, lg: 16 },
                  paddingRight: { md: 6, lg: 24 },
                }}
              >
                {/* Image */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  // width={'350px'}
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
                  paddingLeft: { md: 16, lg: 16 },
                  paddingRight: { md: 6, lg: 24 },
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
              md={2}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'row',
                  sm: 'row',
                  md: 'column',
                  lg: 'column',
                },
                mt: { xs: 3, md: 0 },
                justifyContent: { xs: 'space-between' },
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
            <Grid
              item
              xs={2}
              sm={3}
              md={2}
              sx={{
                paddingRight: { md: 3, lg: 5 },
              }}
            >
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
                  // variant="contained"
                  onClick={handleNavigate}
                  sx={{
                    zIndex: 2,
                    mt: 2,
                    backgroundColor: '#70B1FF',
                    fontFamily: 'Nunito Sans',
                    fontSize: { xs: '25px', md: '20px', lg: '25px' },
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
            fontSize: { xs: '1rem', lg: '2rem' },
            mt: { xs: 6, lg: 10 },
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
            zIndex: 1,
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
    </>
  );
}

const SequencedScrollReveal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
              mt: { xs: 1, sm: 2 },
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              textAlign: 'center',
              px: 2,
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
              mt: { xs: 1, sm: 2 },
              color: 'white',
              borderColor: 'white',
              fontWeight: 'bold',
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: '999px',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' },
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

export default HomePage;
