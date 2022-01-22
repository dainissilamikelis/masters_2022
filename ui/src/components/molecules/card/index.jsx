import React from "react";
import { NavLink } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import PropTypes from 'prop-types';

const SimpleCard = ({ card }) => {
  const { alt, image, title, description, route } = card;
  return (
    <NavLink to={route} style={{ textDecoration: "none" }}>
      <Card sx={{
        maxWidth: 345,
        margin: "auto"
      }}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={alt}
            height="300"
            image={image}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};
SimpleCard.propTypes = {
  card: PropTypes.object.isRequired,
}

export default SimpleCard;
