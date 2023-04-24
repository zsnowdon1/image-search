import React, { useState } from 'react';
import { Photo } from '../../models/models';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export function PhotoCard(photo: Photo) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="500"
                    src={photo.downloadUrl}
                    alt="green iguana"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {photo.filename}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
