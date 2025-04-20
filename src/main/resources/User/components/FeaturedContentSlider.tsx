// import React, { useState, useEffect } from 'react';
// import { Box, Typography, IconButton, Paper, Container } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { motion } from 'framer-motion'; // Import framer-motion for animations

// // Import your logo
// import logo from '../../../assets/logo.png'; // You may need to adjust this path

// // Define the type for our content items
// interface FeaturedContent {
//   id: number;
//   title: string;
//   description: string;
//   imageUrl: string;
//   bgColor: string;
// }

// // Sample content data - in a real application, this would likely come from props or an API
// const featuredContents: FeaturedContent[] = [
//   {
//     id: 1,
//     title: "Proper diet tips and tricks part 2.",
//     description: "Learn from expert on how maintain a proper diet and stay healthy and fit in your life",
//     imageUrl: "../../../assets/diet.png", // Adjust this path as needed
//     bgColor: "#69B1FF" // Blue color from the image
//   },
//   {
//     id: 2,
//     title: "Exercise routines for beginners",
//     description: "Start your fitness journey with these simple exercises designed for beginners",
//     imageUrl: "../../../assets/exercise.png",
//     bgColor: "#FF7E35" // Orange color
//   },
//   {
//     id: 3,
//     title: "Mental health and fitness",
//     description: "Discover the connection between mental wellbeing and physical fitness",
//     imageUrl: "../../../assets/mental.png",
//     bgColor: "#FF7E35" // Orange color
//   }
// ];

// // Create a motion-compatible version of Material UI's Box
// const MotionBox = motion(Box);

// const FeaturedContentSlider: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [direction, setDirection] = useState<'left' | 'right' | null>(null);
//   const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
//   // Get previous, current, and next content based on currentIndex
//   const currentContent = featuredContents[currentIndex];
//   const prevIndex = currentIndex === 0 ? featuredContents.length - 1 : currentIndex - 1;
//   const nextIndex = currentIndex === featuredContents.length - 1 ? 0 : currentIndex + 1;
//   const prevContent = featuredContents[prevIndex];
//   const nextContent = featuredContents[nextIndex];

//   const handlePrev = (): void => {
//     if (isAnimating) return;
//     setDirection('right');
//     setIsAnimating(true);
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === 0 ? featuredContents.length - 1 : prevIndex - 1
//       );
//       setIsAnimating(false);
//     }, 300);
//   };

//   const handleNext = (): void => {
//     if (isAnimating) return;
//     setDirection('left');
//     setIsAnimating(true);
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) => 
//         prevIndex === featuredContents.length - 1 ? 0 : prevIndex + 1
//       );
//       setIsAnimating(false);
//     }, 300);
//   };

//   // Animation variants
//   const boxVariants = {
//     initial: (direction: 'left' | 'right') => ({
//       x: direction === 'left' ? -20 : 20,
//       opacity: 0.9,
//     }),
//     animate: {
//       x: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     },
//     exit: (direction: 'left' | 'right') => ({
//       x: direction === 'left' ? 20 : -20,
//       opacity: 0.9,
//       transition: { duration: 0.5 }
//     })
//   };

//   return (
//     <Box sx={{ 
//       bgcolor: '#333333', 
//       minHeight: '100vh',
//       py: 4,
//       px: 2,
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
//       {/* Left Orange Card (Partially Visible) - positioned to match the image */}
//       <MotionBox 
//         custom={direction}
//         variants={boxVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         sx={{ 
//           position: 'absolute',
//           left: -60,
//           top: '50%',
//           transform: 'translateY(-50%)',
//           width: 160,
//           height: 290,
//           bgcolor: prevContent.bgColor,
//           borderRadius: 4
//         }} 
//       />

//       {/* Featured Content Title */}
//       <Container maxWidth="lg">
//         <Typography 
//           variant="h2" 
//           sx={{ 
//             color: 'white', 
//             fontWeight: 500,
//             fontSize: '2.5rem',
//             mb: 8,
//             pl: 4
//           }}
//         >
//           Featured contents
//         </Typography>

//         {/* Main Content Area - adjusted to match the image proportions */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           {/* Left Orange Card */}
//           <MotionBox 
//             custom={direction}
//             variants={boxVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             sx={{ 
//               width: '24%', 
//               height: 290,
//               bgcolor: prevContent.bgColor,
//               borderRadius: 4,
//               mx: 2
//             }} 
//           />

//           {/* Featured Content Card - resized to match image */}
//           <Paper
//             component={motion.div}
//             custom={direction}
//             variants={{
//               initial: (direction: 'left' | 'right') => ({
//                 x: direction === 'left' ? 100 : -100,
//                 opacity: 0
//               }),
//               animate: {
//                 x: 0,
//                 opacity: 1,
//                 transition: { duration: 0.5 }
//               },
//               exit: (direction: 'left' | 'right') => ({
//                 x: direction === 'left' ? -100 : 100,
//                 opacity: 0,
//                 transition: { duration: 0.5 }
//               })
//             }}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             elevation={4}
//             sx={{
//               width: '48%',
//               bgcolor: '#444444',
//               borderRadius: 4,
//               overflow: 'hidden',
//               color: 'white',
//               position: 'relative',
//               pb: 4
//             }}
//           >
//             {/* Logo and Navigation */}
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'space-between', 
//               alignItems: 'center',
//               px: 3,
//               py: 2
//             }}>
//               <Box component="img" src={logo} alt="Logo" sx={{ width: 40, height: 40 }} />
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <IconButton onClick={handlePrev} sx={{ color: 'white' }}>
//                   <ArrowBackIcon />
//                 </IconButton>
//                 <Typography sx={{ mx: 2, color: 'white', fontWeight: 500 }}>Prev</Typography>
//                 <Typography sx={{ mx: 2, color: 'white', fontWeight: 500 }}>Next</Typography>
//                 <IconButton onClick={handleNext} sx={{ color: 'white' }}>
//                   <ArrowForwardIcon />
//                 </IconButton>
//               </Box>
//             </Box>

//             {/* Content Image - made taller to match the image */}
//             <MotionBox 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               sx={{ 
//                 width: '90%',
//                 height: 280,
//                 mx: 'auto',
//                 bgcolor: currentContent.bgColor,
//                 borderRadius: 4,
//                 mb: 3
//               }} 
//             />

//             {/* Content Text */}
//             <Box sx={{ px: 4, pb: 2 }}>
//               <Typography 
//                 component={motion.h5}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 variant="h5" 
//                 sx={{ fontWeight: 600, mb: 1 }}
//               >
//                 {currentContent.title}
//               </Typography>
//               <Typography 
//                 component={motion.p}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//                 variant="body2" 
//                 sx={{ color: '#cccccc', lineHeight: 1.6 }}
//               >
//                 {currentContent.description}
//               </Typography>
//             </Box>

//             {/* Progress Indicator */}
//             <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
//               <Box sx={{ width: '70%', height: 4, bgcolor: '#666666', borderRadius: 2, position: 'relative' }}>
//                 <MotionBox 
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(currentIndex + 1) / featuredContents.length * 100}%` }}
//                   transition={{ duration: 0.5 }}
//                   sx={{ 
//                     position: 'absolute',
//                     left: 0,
//                     top: 0,
//                     height: '100%',
//                     bgcolor: 'white',
//                     borderRadius: 2
//                   }} 
//                 />
//               </Box>
//             </Box>
//           </Paper>

//           {/* Right Orange Card */}
//           <MotionBox 
//             custom={direction}
//             variants={boxVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             sx={{ 
//               width: '24%', 
//               height: 290,
//               bgcolor: nextContent.bgColor,
//               borderRadius: 4,
//               mx: 2
//             }} 
//           />
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default FeaturedContentSlider;
import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion for animations

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
  
  // Calculate indices correctly
  const getPrevIndex = (index: number) => index === 0 ? featuredContents.length - 1 : index - 1;
  const getNextIndex = (index: number) => index === featuredContents.length - 1 ? 0 : index + 1;
  
  // Current content
  const currentContent = featuredContents[currentIndex];
  
  // Get previous and next content
  const prevContent = featuredContents[getPrevIndex(currentIndex)];
  const nextContent = featuredContents[getNextIndex(currentIndex)];

  const handlePrev = (): void => {
    if (isAnimating) return;
    
    setDirection('right');
    setIsAnimating(true);
    
    // Update the index after a brief delay for animation
    setTimeout(() => {
      setCurrentIndex(getPrevIndex(currentIndex));
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = (): void => {
    if (isAnimating) return;
    
    setDirection('left');
    setIsAnimating(true);
    
    // Update the index after a brief delay for animation
    setTimeout(() => {
      setCurrentIndex(getNextIndex(currentIndex));
      setIsAnimating(false);
    }, 300);
  };

  // Animation variants
  const sideBoxVariants = {
    initial: (direction: string) => ({
      x: direction === 'left' ? -20 : 20,
      opacity: 0.8,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: (direction: string) => ({
      x: direction === 'left' ? 20 : -20,
      opacity: 0.8,
      transition: { duration: 0.4 }
    })
  };

  // Main content animation variants
  const mainContentVariants = {
    initial: (direction: string) => ({
      x: direction === 'left' ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction: string) => ({
      x: direction === 'left' ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    })
  };

  // Key for forcing re-render of animated components
  const animationKey = `content-${currentIndex}-${direction}`;

  return (
    <Box sx={{ 
      bgcolor: '#333333', 
      minHeight: '100vh',
      py: 4,
      px: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left Orange Card (Partially Visible) - positioned to match the image */}
      <AnimatePresence mode="wait" initial={false}>
        <MotionBox 
          key={`left-edge-${animationKey}`}
          custom={direction}
          variants={sideBoxVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          sx={{ 
            position: 'absolute',
            left: -60,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 160,
            height: 290,
            bgcolor: prevContent.bgColor,
            borderRadius: 4
          }} 
        />
      </AnimatePresence>

      {/* Featured Content Title */}
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            color: 'white', 
            fontWeight: 500,
            fontSize: '2.5rem',
            mb: 8,
            pl: 4
          }}
        >
          Featured contents
        </Typography>

        {/* Main Content Area - adjusted to match the image proportions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Orange Card */}
          <AnimatePresence mode="wait" initial={false}>
            <MotionBox 
              key={`left-box-${animationKey}`}
              custom={direction}
              variants={sideBoxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: '24%', 
                height: 290,
                bgcolor: prevContent.bgColor,
                borderRadius: 4,
                mx: 2
              }} 
            />
          </AnimatePresence>

          {/* Featured Content Card - resized to match image */}
          <AnimatePresence mode="wait" initial={false}>
            <Paper
              component={motion.div}
              key={`main-content-${animationKey}`}
              custom={direction}
              variants={mainContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              elevation={4}
              sx={{
                width: '48%',
                bgcolor: '#444444',
                borderRadius: 4,
                overflow: 'hidden',
                color: 'white',
                position: 'relative',
                pb: 4
              }}
            >
              {/* Logo and Navigation */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                px: 3,
                py: 2
              }}>
                <Box component="img" src={logo} alt="Logo" sx={{ width: 40, height: 40 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handlePrev} sx={{ color: 'white' }} disabled={isAnimating}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2, color: 'white', fontWeight: 500 }}>Prev</Typography>
                  <Typography sx={{ mx: 2, color: 'white', fontWeight: 500 }}>Next</Typography>
                  <IconButton onClick={handleNext} sx={{ color: 'white' }} disabled={isAnimating}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Content Image - made taller to match the image */}
              <Box 
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{ 
                  width: '90%',
                  height: 280,
                  mx: 'auto',
                  bgcolor: currentContent.bgColor,
                  borderRadius: 4,
                  mb: 3
                }} 
              />

              {/* Content Text */}
              <Box sx={{ px: 4, pb: 2 }}>
                <Typography 
                  component={motion.h5}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  variant="h5" 
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {currentContent.title}
                </Typography>
                <Typography 
                  component={motion.p}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  variant="body2" 
                  sx={{ color: '#cccccc', lineHeight: 1.6 }}
                >
                  {currentContent.description}
                </Typography>
              </Box>

              {/* Progress Indicator */}
              <Box sx={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: '70%', height: 4, bgcolor: '#666666', borderRadius: 2, position: 'relative' }}>
                  <MotionBox 
                    initial={{ width: `${((currentIndex) / featuredContents.length) * 100}%` }}
                    animate={{ width: `${((currentIndex + 1) / featuredContents.length) * 100}%` }}
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
          </AnimatePresence>

          {/* Right Orange Card */}
          <AnimatePresence mode="wait" initial={false}>
            <MotionBox 
              key={`right-box-${animationKey}`}
              custom={direction}
              variants={sideBoxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{ 
                width: '24%', 
                height: 290,
                bgcolor: nextContent.bgColor,
                borderRadius: 4,
                mx: 2
              }} 
            />
          </AnimatePresence>
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturedContentSlider;