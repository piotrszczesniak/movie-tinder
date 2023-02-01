import { Container } from '@mui/system';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  ScopedCssBaseline,
  Alert,
  AlertTitle,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useRef, useState } from 'react';
import DataContext from '../contexts/DataContext';

const MovieCard = () => {
  const { recommendations, putData } = useContext(DataContext);
  const [movies, setMovies] = useState(recommendations);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  function handleAcceptClick(id: string) {
    putData(`/recommendations/${id}/accept`);

    if (cardRef.current) {
      const animation = cardRef.current.animate(
        [
          { transform: 'translateX(0) rotate(0)', opacity: 1 },
          { transform: 'translateX(-600px) rotate(-90deg)', opacity: 0 },
        ],
        { duration: 500 }
      );

      animation.onfinish = () => {
        handleAnimationEnd();
      };
    }
  }

  function handleRejectClick(id: string) {
    putData(`/recommendations/${id}/reject`);

    if (cardRef.current) {
      const animation = cardRef.current.animate(
        [
          { transform: 'translateX(0)', opacity: 1 },
          { transform: 'translateX(600px) rotate(90deg)', opacity: 0 },
        ],
        { duration: 500 }
      );

      animation.onfinish = () => {
        handleAnimationEnd();
      };
    }
  }

  function handleAnimationEnd() {
    setMovies((state) => {
      const copy = [...state];
      copy.pop();
      return copy;
    });
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    e.stopPropagation();
    touchStartX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>, id: string) {
    e.stopPropagation();
    touchEndX.current = e.changedTouches[0].screenX;
    checkDirection(id);
  }

  function checkDirection(id: string) {
    if (touchEndX.current + 50 < touchStartX.current) {
      // swiped left -> accept
      handleAcceptClick(id);
    }

    if (touchEndX.current > touchStartX.current + 50) {
      // swiped right -> reject
      handleRejectClick(id);
    }
  }

  const movie = movies[movies.length - 1];

  if (!movie) {
    return (
      <Container sx={{ p: 1 }} maxWidth='sm'>
        <Alert severity='info'>
          <AlertTitle>Info</AlertTitle>
          No more recommendations for today!
        </Alert>
      </Container>
    );
  }

  const { id, title, rating, imageURL, summary } = movie;

  return (
    <Container data-testid='container-element' sx={{ p: 1 }} maxWidth='sm'>
      <ScopedCssBaseline>
        <Card
          sx={{ boxShadow: 3, height: '100%' }}
          key={id}
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => {
            handleTouchEnd(e, id);
          }}
        >
          <CardMedia sx={{ height: { xs: 500, md: 600, lg: 700 }, backgroundPosition: 'center center' }} image={imageURL} title={title} />
          <CardContent>
            <Typography sx={{ textAlign: 'center' }} variant='h6' component='h3'>
              {title}
            </Typography>
            <Divider>{rating} / 10</Divider>
            <Typography variant='body1' component='p'>
              {summary}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant='contained' color='success' onClick={() => handleAcceptClick(id)} size='large'>
              <DoneIcon />
              Accept
            </Button>
            <Button variant='contained' color='error' onClick={() => handleRejectClick(id)} size='large'>
              <CloseIcon />
              Reject
            </Button>
          </CardActions>
        </Card>
      </ScopedCssBaseline>
    </Container>
  );
};

export default MovieCard;
