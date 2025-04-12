import { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';

interface ImagesModalProps {
  gymImages: string[];
  setShowModal: (arg0: boolean) => void;
  showModal: boolean;
}

export const ImagesModal: React.FC<ImagesModalProps> = (props) => {
  const { gymImages, setShowModal, showModal } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gymImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gymImages.length - 1 : prevIndex - 1
    );
  };
  return (
    <Dialog open={showModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Image {currentImageIndex + 1}/{gymImages.length}
          </Typography>
          <img
            src={gymImages[currentImageIndex]}
            alt={`Gym ${currentImageIndex + 1}`}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Updated Date:
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={2}
          >
            <Button onClick={handlePrevImage}>
              <ArrowBackIcon />
            </Button>
            <Button onClick={handleNextImage}>
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
