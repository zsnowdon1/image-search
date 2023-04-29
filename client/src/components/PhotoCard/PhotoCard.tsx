import React, { useState } from 'react';
import { Photo } from '../../models/models';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './PhotoCard.css';

export function PhotoCard(photo: Photo) {

    return (
        <Card className="card" sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="500"
                    src={photo.downloadUrl}
                    alt="error loading"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {photo.filename}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
