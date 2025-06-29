import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import Container from '../Container';
import Section from '../Section';

const LocationCard = ({ location }) => {
  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        transition: 'transform 0.3s',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <CardMedia
        component="img"
        image={location.image}
        alt={location.city}
        sx={{
          width: '100%',
          aspectRatio: '4 / 3',
          objectFit: 'cover',
          filter: 'brightness(0.9)'
        }}
      />
      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          color: 'white',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          padding: 3
        }}
      >
        <Typography variant="h5" component="h4" gutterBottom>
          {location.city}
        </Typography>
        <Typography variant="subtitle1">{location.listings} Listings</Typography>
      </CardContent>
    </Card>
  );
};

function PopularLocations() {
  const locations = [
    {
      id: 1,
      city: 'London',
      image: 'https://images.unsplash.com/photo-1587726480710-003743795e40?q=80&w=400',
      listings: 3
    },
    {
      id: 2,
      city: 'Los Angeles',
      image: 'https://images.unsplash.com/photo-1669762992626-ffe9f54b676a?q=80&w=400',
      listings: 3
    },
    {
      id: 3,
      city: 'New York',
      image: 'https://images.unsplash.com/photo-1457885208630-7f09c8b8ba2b?q=80&w=400',
      listings: 3
    },
    {
      id: 4,
      city: 'Paris',
      image: 'https://images.unsplash.com/photo-1584266337361-679ae80c8519?q=80&w=400',
      listings: 3
    },
    {
      id: 5,
      city: 'Tokyo',
      image: 'https://images.unsplash.com/photo-1610802711091-89aaa0ce4bc5?q=80&w=400',
      listings: 3
    },
    {
      id: 6,
      city: 'Dubai',
      image: 'https://images.unsplash.com/photo-1610823230542-55da5ce635aa?q=80&w=400',
      listings: 3
    },
    {
      id: 7,
      city: 'Rome',
      image: 'https://images.unsplash.com/photo-1583422095309-55daabc9cc78?q=80&w=400',
      listings: 3
    },
    {
      id: 8,
      city: 'Sydney',
      image: 'https://images.unsplash.com/photo-1739991322693-ebf56df20479?q=80&w=400',
      listings: 3
    },
    {
      id: 9,
      city: 'Palestine',
      image: 'https://images.unsplash.com/photo-1620673419128-1fd41f170878?q=80&w=400',
      listings: 3
    }
  ];

  return (
    <Section id="locate">
      <Container>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h2" gutterBottom>
            Popular <span>Locations</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            You can find properties in these popular locations around the world. Properties are available for rent or sale in these cities.
          </Typography>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 1390, mx: 'auto', px: 2 }}>
          <Grid container spacing={4}>
            {locations.map((location) => (
              <Grid
                item
                key={location.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ display: 'flex' }}
              >
                <LocationCard location={location} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Section>
  );
}

export default PopularLocations;
