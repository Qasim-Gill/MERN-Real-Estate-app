import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  styled,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import conf from '../../conf';
import { toggleFollow } from '../../Redux/authSlice';

const AgentCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

export default function OurAgents() {
  const dispatch = useDispatch();
  const agents = useSelector(state => state.auth.users);
  const currentUser = useSelector(state => state.auth.userData);
  // console.log("Agents:", agents);
  // console.log("Current User:", currentUser?.following, currentUser?.followers);

  const handleFollowToggle = async (targetUserId, isFollowing) => {
    try {
      const url = `${conf.baseUrl}/api/users/${targetUserId}/${isFollowing ? 'unfollow' : 'follow'}`;
      const response = await axios.post(url, {}, {
        withCredentials: true,
      });

      const { status } = response.data;
      if (status !== 'success') {
        console.error("Failed to toggle follow status:", response.data.message);
        return;
      }

      dispatch(toggleFollow(targetUserId));

    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <>
      <Box mb={6} textAlign="center">
        <Typography variant="h3" component="h2" gutterBottom>
          Meet Our Agents
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore top-rated properties in your preferred location with trusted agents and seamless support throughout your journey.
        </Typography>
      </Box>

      {agents?.length > 0 ? (
        <Box sx={{ margin: '0 auto', paddingX: 2, marginBottom: 5 }}>
          <Grid container spacing={3} justifyContent="center">
            {agents.map((agent) => {
              const isFollowing = currentUser?.following?.includes(agent._id);
              const isSelf = currentUser?._id === agent._id;

              return (
                <Grid item key={agent._id} xs={12} sm={6} md={3}>
                  <AgentCard>
                    <CardMedia
                      component="img"
                      image={agent.image?.url || '/img/default-agent.jpg'}
                      height="260"
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">{agent.fullname}</Typography>
                      <Typography variant="body2" align="center">
                        {agent.category || 'Real Estate Agent'}
                      </Typography>

                      {!isSelf && (
                        <Box textAlign="center" mt={1}>
                          <Button
                            size="small"
                            variant={isFollowing ? 'outlined' : 'contained'}
                            color="primary"
                            onClick={() => handleFollowToggle(agent._id, isFollowing)}
                          >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </AgentCard>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        <Box mb={5} textAlign="center" py={5}>
          <Typography variant="h5">No agents available at the moment</Typography>
        </Box>
      )}
    </>
  );
}
