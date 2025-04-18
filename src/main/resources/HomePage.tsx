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
} from '@mui/material';
import { Facebook, Instagram, Twitter, Email, Menu, Close, KeyboardArrowDown } from '@mui/icons-material';
import { useIsAuthenticated } from 'react-auth-kit';
import { motion, AnimatePresence } from 'framer-motion';

import { mainhomepage } from '../assets';
import { ListingCarousel } from './Commons/ListingCarousel';
import FindOptions from './FindOptions/FindOptions';

// Enhanced debounce function with leading/trailing options
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: false, trailing: true }
) {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (...args: Parameters<T>) {
    if (options.leading && !timeout) {
      func.apply(null, args);
    } else {
      lastArgs = args;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      if (options.trailing && lastArgs) {
        func.apply(null, lastArgs);
      }
      timeout = null;
      lastArgs = null;
    }, wait);
  };
}

/** Responsive NavBar component with smooth transitions */
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
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFC107' }}>
            FLEX‑VERSE
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <Menu />
          </IconButton>
        </Box>
      ) : (
        <Stack direction="row" spacing={4} sx={{ fontWeight: 500, mb: 4 }}>
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
                  transform: 'scaleX(0ѿ0',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '70%',
            backgroundColor: '#1e2539',
            color: 'white',
            transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
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
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 'bold',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': {
                        color: '#FFC107',
                      },
                    },
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

/** Custom hook to calculate scroll progress with improved performance */
function useScrollProgress(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const lastProgress = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        const scrolledIntoSection = Math.max(windowHeight - rect.top, 0);
        const rawProgress = scrolledIntoSection / (windowHeight + sectionHeight);
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        if (Math.abs(clampedProgress - lastProgress.current) > 0.005) {
          setProgress(clampedProgress);
          lastProgress.current = clampedProgress;
        }
      });
    };

    const optimizedScroll = debounce(handleScroll, 16, { trailing: true });
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ref]);

  return progress;
}

/** Enhanced FLEX‑VERSE Section with smoother animations */
function FlexVerseSection({ progress = 0 }: { progress?: number }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const blurValue = Math.min(50 * progress, 10);
  const minScale = isMobile ? 0.8 : 0.667;
  const scaleValue = Math.max(3 - 2.5 * progress, minScale);
  const overlayOpacity = 0.3 + 0.5 * progress;
  const contentOpacity = 1 - Math.min(progress * 1.5, 1);
  const showSubtitles = progress >= 0.4;
  const rotateValue = progress * 5;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        scrollSnapAlign: 'start',
        transition: 'opacity 0.5s ease-in-out',
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
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        },
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          scale: scaleValue,
          rotate: `${rotateValue}deg`,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 25,
          mass: 0.8,
          restDelta: 0.001,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: 'transparent',
            fontWeight: 500,
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

      <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', overflow: 'hidden', mt: 4 }}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: showSubtitles ? 0 : 100,
            opacity: showSubtitles ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: 0.2,
            restDelta: 0.001,
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
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: 0.4,
            restDelta: 0.001,
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

/** Enhanced Sequenced Scroll Reveal Component */
function SequencedScrollReveal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        {step >= 1 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 18,
              duration: 0.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                mt: 2,
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                fontWeight: 500,
                textAlign: 'center',
                textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            >
              Become the best version of yourself
            </Typography>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 90,
              damping: 16,
              duration: 0.4,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                color: 'white',
                borderColor: 'white',
                fontWeight: 'bold',
                px: { xs: 2.5, sm: 3.5 },
                py: 1,
                borderRadius: '999px',
                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Our Services
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

/** Enhanced Main HomePage Component with Full-Page Scroll and Fade Transitions */
function HomePage() {
  const isAuthenticated = useIsAuthenticated();
  const [scrollY, setScrollY] = useState(0);
  const [locked, setLocked] = useState(true);

  const heroRef = useRef(null);
  const flexVerseRef = useRef(null);

  const flexVerseProgress = useScrollProgress(flexVerseRef);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollY = () => {
      setScrollY(lastScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const timer = setTimeout(() => {
      setLocked(false);
    }, 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const maxScroll = 300;
  const scale = 1 + (scrollY / maxScroll) * 0.2;
  const parallaxOffset = -(scrollY * 0.15);

  return (
    <>
      <AnimatePresence>
        {locked && (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
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
              fontSize: '1.8rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              Welcome to FLEX‑VERSE
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          transform: `scale(${Math.min(scale, 1.1)}) translateY(${parallaxOffset}px)`,
          willChange: 'transform',
          transition: 'transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: -1,
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(2px)',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
          },
        }}
      />

      <Box
        sx={{
          scrollSnapType: 'y mandatory',
          overflowY: 'auto',
          height: '100vh',
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 2,
              py: 3,
              scrollSnapAlign: 'start',
            }}
          >
            <NavBar />
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: 'md',
                mb: 2,
                willChange: 'opacity, transform',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.6rem', sm: '2.2rem' } }}
                >
                  REACH YOUR LIMITS
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ fontSize: { xs: '1.6rem', sm: '2.2rem' } }}
                >
                  AND GET TO THE NEXT LEVEL
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <Typography variant="body1" sx={{ mt: 1, mb: 3, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Unlock your full potential with personalized fitness and nutrition guidance.
                </Typography>
              </motion.div>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    ABOUT US
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#FFA76D',
                      color: 'black',
                      transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                      '&:hover': {
                        backgroundColor: '#ff8c42',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    JOIN NOW
                  </Button>
                </motion.div>
              </Stack>
              <SequencedScrollReveal />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Typography variant="subtitle1" gutterBottom sx={{ mb: 1, fontSize: '0.9rem' }}>
                  SOCIAL
                </Typography>
              </motion.div>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                {[Facebook, Instagram, Twitter, Email].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.08,
                      type: 'spring',
                      stiffness: 200,
                      damping: 8,
                    }}
                  >
                    <IconButton
                      color="inherit"
                      size="small"
                      sx={{
                        transition: 'all 0.25s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          color: '#FFC107',
                        },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.7rem' }}
                  >
                    SCROLL DOWN
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                >
                  <KeyboardArrowDown
                    sx={{
                      color: 'white',
                      fontSize: '1.5rem',
                    }}
                  />
                </motion.div>
              </Box>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          ref={flexVerseRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <FlexVerseSection progress={flexVerseProgress} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              py: '1rem',
            }}
          >
            <FindOptions />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              py: 3,
            }}
          >
            <ListingCarousel title="Top Trainers Near You" type="Trainers" />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
              py: 3,
            }}
          >
            <ListingCarousel title="Top Dieticians Near You" type="Dietitians" />
          </Box>
        </motion.div>
      </Box>

      <Box
        sx={{
          '@keyframes smoothBounce': {
            '0%, 100%': {
              transform: 'translateY(0)',
              animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            '50%': {
              transform: 'translateY(-5px)',
              animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
          },
        }}
      />
    </>
  );
}

export default HomePage;