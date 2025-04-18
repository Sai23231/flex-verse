import { Box, Grid, Typography } from '@mui/material';

interface ImageContainerProps {
  gymImages: string[];
  setShowModal: (arg0: boolean) => void;
}

export const ImageContainer: React.FC<ImageContainerProps> = (props) => {
  const { gymImages, setShowModal } = props;
  const handleViewMoreClick = () => {
    setShowModal(true);
  };
  return (
    <Grid item xs={6}>
      <Grid container spacing={2}>
        {gymImages.slice(0, 4).map((image, index) => (
          <Grid key={index} item xs={6}>
            <Box position="relative">
              <img
                src={image}
                alt={`Gym ${index + 1}`}
                style={{
                  width: '100%',
                  height: '36vh',
                  objectFit: 'cover',
                  filter: index === 3 ? 'brightness(0.7)' : 'none',
                }}
              />
              {index === 3 && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={handleViewMoreClick}
                >
                  <Typography variant="subtitle2">View More</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
