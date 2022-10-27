import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// This will eventually be replaced by process.env.BACKEND_URL or something
const API = 'http://localhost:8080'; // https://workout-tracker-api.onrender.com/

// The most straitforward way of doing this I've been able to find.
const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// default styling from MUI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: '200px',
}));

// this array is here as a template for what I believe should returned by the API call and for testing
// It should not exist in production
const tempWeekViewArr = [
  { name: 'upper body', dayOfWeek: 0 },
  { name: 'lower body', dayOfWeek: 1 },
  { name: 'push', dayOfWeek: 2 },
  { name: 'pull', dayOfWeek: 3 },
  { name: 'legs', dayOfWeek: 4 },
  { name: 'arms', dayOfWeek: 5 },
  { name: 'booty', dayOfWeek: 6 },
];

export default function WeekView({ setView }) {
  const [weekViewArr, setWeekViewArr] = useState(tempWeekViewArr);

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `${API}/workout/${localStorage.getItem('userid')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            'Content-Length': 123,
            authorization: localStorage.getItem('token'),
          },
        }
      );
      const content = await rawResponse.json();
      console.log(content);
      // setWeekViewArr(content);
    })();
  });

  return (
    <Box>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={0.5}
      >
        {/* // TODO add onClick to Item to setView to DayView obj.dayOfWeek */}
        {weekViewArr.map(obj => {
          return (
            <Item>{`${daysOfTheWeek[obj.dayOfWeek]} -  Workout: ${
              obj.name
            }`}</Item>
          );
        })}
      </Stack>
    </Box>
  );
}
