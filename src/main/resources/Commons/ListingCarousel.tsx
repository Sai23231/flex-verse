import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import { homepageApi } from '../../API/HomepageApi';
import { useNotification } from '../../context/NotificationProvider';
import { renderRatingStars } from '../Utils/RenderRatingStars';

import type { ConsultantSummary } from '../Models';

interface ListingCarouselProps {
  title: string;
  type: string;
}

export const ListingCarousel: React.FC<ListingCarouselProps> = (props) => {
  const { title, type } = props;
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [consultants, setConsultants] = useState<ConsultantSummary[]>([]);
  const handleButtonClick = (url: string, id: string) => {
    navigate(`/${url}/${id}`);
  };
  useEffect(() => {
    homepageApi
      .getRecommendedConsultants(type)
      .then((response) => setConsultants(response))
      .catch((error) =>
        showNotification(
          true,
          'failed',
          'Fetching Recommendations Failed',
          error.response.data
        )
      );
  }, []);
  return (
    <div style={{ margin: 9 }}>
      <Typography variant="h5" style={{ margin: '0.5rem' }}>
        {title}
      </Typography>
      <Container
        style={{
          margin: 0,
          maxWidth: '100%',
          overflowX: 'scroll',
        }}
      >
        <div style={{ width: '100%', overflowX: 'scroll' }}>
          <Grid
            container
            spacing={2}
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              padding: '0.5rem',
            }}
          >
            {consultants.map((consultant, index) => (
              <Grid
                item
                key={index}
                style={{ flex: '0 0 auto', marginRight: '1rem' }}
              >
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    border: `2px solid ${
                      hoveredCard === index ? '#f0f0f0' : 'transparent'
                    }`,
                    transition: 'border 0.2s ease-in-out',
                  }}
                  onClick={() =>
                    handleButtonClick('trainerDetails', consultant.id)
                  }
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardMedia
                    style={{
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%',
                      marginBottom: '0.5rem',
                    }}
                    image={`${process.env.REACT_APP_BACKEND_URL}/consultant/${consultant.id}/image`}
                    title={`${consultant.firstName} ${consultant.lastName}`}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ marginBottom: '0.25rem' }}
                    >
                      {`${consultant.firstName} ${consultant.lastName}`}
                    </Typography>
                    <div style={{ display: 'flex' }}>
                      {renderRatingStars(consultant.averageRating, 'small')}
                      <Typography variant="body2" color="textSecondary">
                        ({consultant.totalRatings ? consultant.totalRatings : 0}{' '}
                        reviews)
                      </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary">
                      {consultant.specializations
                        .slice(0, 2)
                        .map((spec, indx) => (
                          <span key={index}>
                            {spec.title}
                            {indx !==
                            consultant.specializations.slice(0, 2).length - 1
                              ? ', '
                              : ''}
                          </span>
                        ))}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {consultant.currency === 'USD' ? '$' : 'Rs.'}
                      {consultant.pricePerConsultation}/consultation
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};
