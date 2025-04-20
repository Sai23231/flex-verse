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
} from '@mui/material';
import { Facebook, Instagram, Twitter, Email, Menu, Close, KeyboardArrowDown } from '@mui/icons-material';
import { useIsAuthenticated } from 'react-auth-kit';
import { motion, AnimatePresence } from 'framer-motion';

import { main_homepage } from '../assets';
import logo from '../assets/logo.png';
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
                objectFit: 'contain'
              }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FFC107', fontSize: '1rem' }}>
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
            justifyContent: 'center'
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
          '& .MuiDrawer-paper': { width: '80%', maxWidth: '300px', backgroundColor: '#1e2539', color: 'white' },
        }}
      >
        <Box sx={{ textAlign: 'right', p: 1 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box
            component="img"
            src={logo}
            alt="FLEX-VERSE Logo"
            sx={{ 
              width: 32,
              height: 32,
              objectFit: 'contain'
            }}
          />
          <Typography sx={{ fontWeight: 'bold', color: '#FFC107', fontSize: '1rem' }}>
            FLEX‑VERSE
          </Typography>
        </Box>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding onClick={handleDrawerToggle}>
              <ListItemButton>
                <ListItemText primary={item} primaryTypographyProps={{ sx: { fontWeight: 'bold' } }} />
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
  const scaleValue = Math.max(isMobile ? (2.2 - (1.5 * progress)) : (3 - (2 * progress)), minScale);
  
  // Enhanced overlay opacity for darker tint
  const overlayOpacity = 0.2 + (0.6 * progress);
  
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
        }
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
              md: 'clamp(80px, 8rem, 8rem)' 
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
            }
          }}
        >
          FLEX‑VERSE
        </Typography>
      </motion.div>
      
      {/* Descriptive Lines with Enhanced Animation */}
      <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', overflow: 'hidden', mt: { xs: 2, sm: 4 }, px: 2, width: '100%' }}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: showSubtitles ? 0 : 100,
            opacity: showSubtitles ? 1 : 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2
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
            opacity: showSubtitles ? 1 : 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.4
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
  const opacity = scrollY < maxScroll ? 1 - (scrollY / maxScroll) : 0;

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
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            maxWidth: 'md', 
            mb: { xs: 3, sm: 2 },
            mt: isMobile ? 2 : 0,
          }}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem' },
                lineHeight: { xs: 1.2, sm: 1.3 },
                mb: { xs: 1, sm: 2 }
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
                mb: { xs: 1, sm: 2 }
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
                px: { xs: 1, sm: 0 }
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                  fontSize: { xs: '0.875rem', sm: '1rem' }
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
                letterSpacing: { xs: 1, sm: 2 }
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
              <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                <Facebook fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                <Instagram fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                <Twitter fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton color="inherit" size={isMobile ? "small" : "medium"}>
                <Email fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Stack>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 } 
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  textTransform: 'uppercase', 
                  letterSpacing: 1,
                  fontSize: { xs: '0.7rem', sm: '0.875rem' }
                }}
              >
                SCROLL DOWN
              </Typography>
              <KeyboardArrowDown sx={{ 
                color: 'white',
                fontSize: { xs: '1.5rem', sm: '2rem' },
                animation: 'bounce 2s infinite'
              }} />
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* FLEX‑VERSE Section */}
      <Box ref={flexVerseRef} sx={{ height: flexVerseSectionHeight, position: 'relative' }}>
        <FlexVerseSection progress={flexVerseProgress} />
      </Box>

      {/* Other Sections */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{ py: { xs: '0.5rem', sm: '1rem' } }}>
            <FindOptions />
          </Box>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{ py: { xs: 2, sm: 3 } }}>
            <ListingCarousel title="Top Trainers Near You" type="Trainers" />
          </Box>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Box sx={{ py: { xs: 2, sm: 3 } }}>
            <ListingCarousel title="Top Dieticians Near You" type="Dietitians" />
          </Box>
        </motion.div>
      </Container>

      {/* Add keyframes for bounce animation */}
      <Box
        sx={{
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0)'
            },
            '40%': {
              transform: 'translateY(10px)'
            },
            '60%': {
              transform: 'translateY(5px)'
            }
          }
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
    const timers = [setTimeout(() => setStep(1), 1000), setTimeout(() => setStep(2), 2000)];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeInOut' }}>
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
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
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
