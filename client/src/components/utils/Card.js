import * as React from 'react';
import MaterialUICard from '@mui/material/Card'; // Renamed import
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


export default function CustomCard(props) {
  return (
    <MaterialUICard sx={{ maxWidth: 345 }} className='m-4'>
      <CardMedia
        sx={{ height: 160 }}
        image={props.src}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={props.link}><Button size="small">Show Me</Button></Link>
      </CardActions>
    </MaterialUICard>
  );
}
