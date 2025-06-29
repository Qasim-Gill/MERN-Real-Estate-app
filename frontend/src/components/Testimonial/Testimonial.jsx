import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
  Divider,
  useTheme
} from '@mui/material';
import Section from '../Section';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialCard = ({ testimonial }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      height: '100%',
      width: '100%',
      p: 3,
      position: 'relative',
      transition: 'transform 0.3s, box-shadow 0.3s',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 320, // Fixed minimum height
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      <FormatQuoteIcon sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 60,
        color: theme.palette.divider,
        opacity: 0.5
      }} />

      <CardContent sx={{
        p: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating
            value={testimonial.rating}
            readOnly
            precision={0.5}
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>

        <Typography variant="body1" sx={{
          mb: 3,
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1,
          flexGrow: 1
        }}>
          {testimonial.quote}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={testimonial.image}
            alt={testimonial.name}
            sx={{
              width: 56,
              height: 56,
              mr: 2
            }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {testimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonial.role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO, TechStart',
      image: '/img/10.jpg',
      rating: 5,
      quote: 'Working with this team transformed our real estate strategy. Their market insights and professional approach helped us secure three prime properties under budget.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Director, Urban Living',
      image: '/img/11.jpg',
      rating: 4.5,
      quote: 'Exceptional service from start to finish.'
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'VP Investments, Global Holdings',
      image: '/img/12.jpg',
      rating: 5,
      quote: 'The level of professionalism is unmatched.'
    }
  ];

  return (
    <Section id="testim" sx={{
      backgroundColor: 'background.paper',
      py: 8
    }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h2" gutterBottom>
            What Our <span>Clients Say</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" maxWidth="md" mx="auto">
            Don't just take our word for it. Here's what our clients have to say.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} sm={6} md={4} sx={{
              display: 'flex',
              minWidth: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.333% - 32px)' },
              maxWidth: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.333% - 32px)' }
            }}>
              <TestimonialCard testimonial={testimonial} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default Testimonial;