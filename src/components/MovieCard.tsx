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
import { usePutData } from '../hooks/usePutData';
import { useContext, useRef, useState } from 'react';
import DataContext from '../contexts/DataContext';

const MovieCard = () => {
  const { recommendations } = useContext(DataContext);
  const [movies, setMovies] = useState(recommendations);
  const { putData } = usePutData();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAcceptClick = (id: string) => {
    putData(`/recommendations/${id}/accept`);

    if (cardRef.current) {
      cardRef.current.animate(
        [
          { transform: 'translateX(0) rotate(0)', opacity: 1 },
          { transform: 'translateX(-600px) rotate(-90deg)', opacity: 0 },
        ],
        { duration: 500 }
      );
    }
  };

  const handleRejectClick = (id: string) => {
    putData(`/recommendations/${id}/reject`);

    if (cardRef.current) {
      cardRef.current.animate(
        [
          { transform: 'translateX(0)', opacity: 1 },
          { transform: 'translateX(600px) rotate(90deg)', opacity: 0 },
        ],
        { duration: 500 }
      );
    }
  };

  const handleAnimationEnd = () => {
    setMovies((state) => {
      const copy = [...state];
      copy.pop();
      return copy;
    });
  };

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
        <Card sx={{ boxShadow: 3 }} key={id} ref={cardRef} onAnimationEnd={handleAnimationEnd}>
          <CardMedia sx={{ height: '75vh', backgroundPosition: 'center center' }} image={imageURL} title={title} />
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
