import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GlobalProvider } from '../global/GlobalProvider.global';
import { FormGroup, FormControlLabel, Switch, Box, Typography } from '@mui/material';

export default function SelectDay() {
  const { day, setDay } = GlobalProvider();

  const handleChangeDay = (
    _event: React.MouseEvent<HTMLElement>,
    newDay: string,
  ) => {

    if (newDay) {
      setDay(prev => ({
        ...prev,
        day: newDay
      }));
    }
  };

  const handleChangeShowNext = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDay(prev => ({
      ...prev,
      showNext: event.target.checked
    }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="grey.200"
      textAlign="center"
      borderRadius={2}
      color={"black"}
    >
      <ToggleButtonGroup
        size="small"
        value={day.day}
        exclusive
        onChange={handleChangeDay}
        aria-label="Select Day"
        sx={{
          cursor: "pointer",
          '& .MuiToggleButton-root': {
            fontSize: {
              xs: '0.5rem',
              sm: '0.5rem',
              md: '0.8rem',
              lg: '0.8rem',
              xl: '0.8rem',
            },
            '&:hover': {
              backgroundColor: 'grey.400',
              color: 'white',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgb(69, 81, 121)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgb(69, 81, 121)',
                color: 'white',
              },
            },
          },
        }}

      >
        <ToggleButton value="Sunday">Sunday</ToggleButton>
        <ToggleButton value="Monday">Monday</ToggleButton>
        <ToggleButton value="Tuesday">Tuesday</ToggleButton>
        <ToggleButton value="Wednesday">Wednesday</ToggleButton>
        <ToggleButton value="Thursday">Thursday</ToggleButton>
        <ToggleButton value="Friday">Friday</ToggleButton>
        <ToggleButton value="Saturday">Saturday</ToggleButton>
      </ToggleButtonGroup>

      <Typography>
        Prioritize?
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={day.showNext}
              onChange={handleChangeShowNext}
            />
          }
          label=""
          labelPlacement="start"
          sx={{ marginLeft: 0 }}
        />
      </FormGroup>
    </Box>
  );
}