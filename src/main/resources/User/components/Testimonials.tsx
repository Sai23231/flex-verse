import {
  Box,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

function Testimonials() {
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
  return (
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
  );
}

export default Testimonials;
