import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ScoreCard from './components/ScoreCard';

const sportsList = [
    { key: 'vb_g', name: 'Volleyball Girls' },
    { key: 'bb_b', name: 'Basketball Boys' },
];

const Home = () => {
    const [matches, setMatches] = useState({});

    const fetchMatchData = async (matchKey) => {
        try {
            const endpoint = `https://adityaiyer2k7.pythonanywhere.com/portal/getlive?matchid=${matchKey}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${matchKey}`);
            }
            const data = await response.json();
            console.log(data);
            setMatches(prevMatches => ({
                ...prevMatches,
                [matchKey]: {
                    school1: data.school1 || 'TBD',
                    team1Logo: null, // Placeholder for team1 logo
                    team1Score: data.data.team1score || '--',
                    school2: data.school2 || 'TBD',
                    team2Logo: null, // Placeholder for team2 logo
                    team2Score: data.data.team2score || '--',
                }
            }));
        } catch (error) {
            console.error(`Error fetching data for ${matchKey}: ${error.message}`);
        }
    };

    useEffect(() => {
        const fetchData = () => {
            sportsList.forEach((sport, index) => {
                setTimeout(() => {
                    fetchMatchData(sport.key);
                }, index * 5000); // Stagger the requests by 5 seconds
            });
        };

        // Initial data fetch
        fetchData();

        // Set up interval to fetch data every 10 seconds
        const intervalId = setInterval(fetchData, 10000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Grid container spacing={2} sx={{ padding: '20px' }}>
                {sportsList.map((sport, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        {matches[sport.key] ? (
                            <ScoreCard 
                                sport={sport.name}
                                school1={matches[sport.key]?.school1 || 'TBD'}
                                team1Logo={matches[sport.key]?.team1Logo || 'path/to/placeholder/logo.png'}
                                team1Score={matches[sport.key]?.team1Score || '--'}
                                school2={matches[sport.key]?.school2 || 'TBD'}
                                team2Logo={matches[sport.key]?.team2Logo || 'path/to/placeholder/logo.png'}
                                team2Score={matches[sport.key]?.team2Score || '--'}
                            />
                        ) : (
                            <Typography variant="h6" align="center">
                                {sport.name} - No live data available
                            </Typography>
                        )}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
