import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';

const ScoreCard = ({ sport, school1, team1Logo, team1Score, school2, team2Logo, team2Score }) => {
    return (
        <Card sx={{ minWidth: 200, margin: '10px' }} style={{elevation:7,borderRadius:50}}>
            <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" textAlign="center" width="100%">{ sport }</Typography>
                    <Grid item xs={5} container alignItems="center" direction="column">
                        <Avatar src={team1Logo} alt="Team 1 Logo" sx={{ width: 50, height: 50 }} />
                        <Typography variant="h6" sx={{ marginTop: '5px' }}>
                            {school1}
                        </Typography>
                        <Typography variant="h5" sx={{ marginTop: '5px' }} fontWeight={'bold'}>
                            {team1Score}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" align="center">vs</Typography>
                    </Grid>
                    <Grid item xs={5} container alignItems="center" direction="column" justifyContent="flex-end">
                        <Avatar src={team2Logo} alt="Team 2 Logo" sx={{ width: 50, height: 50 }} />
                        <Typography variant="h6" sx={{ marginTop: '5px' }}>
                            {school2}
                        </Typography>
                        <Typography variant="h5" sx={{ marginTop: '5px' }} fontWeight={'bold'}>
                            {team2Score}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ScoreCard;
