import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  TextField, 
  Button, 
  IconButton,
  Stack
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Import images
import shieldLogo from '../../../assets/logo.png';
import flexText from '../../../assets/Flex.png';
import verseText from '../../../assets/verse.png';
import footerBg from '../../../assets/footerBg.png';

const UserFooter: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: '100% 100%', // Changed to ensure complete visibility
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'white',
        py: 4,
        width: '100%',
        position: 'relative',
        minHeight: '650px', // Added to ensure enough height for the background
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Logo and Tagline Column */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Logo - Combined from your images */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {/* Shield logo */}
                <Box component="img" src={shieldLogo} alt="Flexverse Shield" sx={{ height: 100, mr: 0 }} />
                
                {/* Word logo constructed from Flex and verse */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <Box component="img" src={flexText} alt="Flex" sx={{ height: 40, m: 0, p: 0 }} />
                  <Box component="img" src={verseText} alt="verse" sx={{ height: 25, m: 0, p: 0 }} />
                </Box>

              </Box>
              
              <Typography variant="body2">
                Become the best<br />
                Version Of Yourself
              </Typography>
            </Box>
          </Grid>
          
          {/* Navigation Links Column 1 */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>Home</Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Supplements</Link>
              <Link href="#" color="inherit" underline="hover">Merchendise</Link>
            </Stack>
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Get started</Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Find a Gym</Link>
              <Link href="#" color="inherit" underline="hover">Find a trainer</Link>
              <Link href="#" color="inherit" underline="hover">Find a Dietition</Link>
            </Stack>
          </Grid>
          
          {/* Navigation Links Column 2 */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>Join us</Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Register your Gym</Link>
              <Link href="#" color="inherit" underline="hover">Careers</Link>
            </Stack>
            
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Policy</Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Terms and condition</Link>
              <Link href="#" color="inherit" underline="hover">Privacy and pilocies</Link>
            </Stack>
          </Grid>
          
          {/* Contact and Subscribe Column */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ mb: 2 }}>Get in touch</Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <IconButton aria-label="Facebook" sx={{ color: 'white' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" sx={{ color: 'white' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={{ color: 'white' }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', mt: 3 }}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{
                  mr: 1,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#767676',
                  borderRadius: 5,
                  '&:hover': {
                    backgroundColor: '#5a5a5a',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        {/* Copyright Section */}
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ mt: 8, pt: 2 }}
        >
          Copyright © 2023 Flex-Verse.com - All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default UserFooter;