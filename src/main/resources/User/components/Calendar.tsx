import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Grid,
  IconButton,
  Paper,
  InputAdornment
} from '@mui/material';
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

interface CalendarProps {
  className?: string;
}

// Glassmorphism effect style for white cards
const whiteCardStyle = {
  background: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
  padding: '20px',
  overflow: 'hidden'
};

const Calendar = (props: CalendarProps) => {
  const { className } = props;
  const [date, setDate] = useState('08/17/2025');
  const [currentMonth, setCurrentMonth] = useState<number>(7); // August
  const [currentYear, setCurrentYear] = useState<number>(2025);
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [displayMonth, setDisplayMonth] = useState('Aug');
  
  // Timer state
  const [hours, setHours] = useState('02');
  const [minutes, setMinutes] = useState('45');

  // Month names mapping
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Update display month when currentMonth changes
  useEffect(() => {
    setDisplayMonth(monthNames[currentMonth]);
  }, [currentMonth]);
  
  // Get current days for selected month/year
  const getDaysInMonth = (month: number, year: number) => {
    // Get days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get day of week for 1st of month (0 = Sunday)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get days from previous month
    const prevMonthDays = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push(daysInPrevMonth - i);
    }
    
    // Get days for current month
    const monthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(i);
    }
    
    // Get days for next month
    const nextMonthDays = [];
    const totalCells = 42; // 6 rows of 7 days
    const remainingCells = totalCells - (prevMonthDays.length + monthDays.length);
    
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push(i);
    }
    
    // Construct calendar grid
    const calendarDays = [];
    let week = [];
    
    // Add previous month days
    for (let i = 0; i < prevMonthDays.length; i++) {
      week.push({day: prevMonthDays[i], isCurrentMonth: false, isPrevMonth: true});
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
    }
    
    // Add current month days
    for (let i = 0; i < monthDays.length; i++) {
      week.push({day: monthDays[i], isCurrentMonth: true});
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
    }
    
    // Add next month days
    for (let i = 0; i < nextMonthDays.length; i++) {
      week.push({day: nextMonthDays[i], isCurrentMonth: false, isNextMonth: true});
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
    }
    
    if (week.length > 0) {
      calendarDays.push(week);
    }
    
    return calendarDays;
  };

  const [calendarDays, setCalendarDays] = useState(getDaysInMonth(currentMonth, currentYear));

  // Update calendar when month or year changes
  useEffect(() => {
    setCalendarDays(getDaysInMonth(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      } else {
        return prev - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const handlePrevYear = () => {
    setCurrentYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prev => prev + 1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    // Parse the date and update month/year/day if valid
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = e.target.value.match(datePattern);
    
    if (match) {
      const month = parseInt(match[1]) - 1; // 0-11
      const day = parseInt(match[2]);
      const year = parseInt(match[3]);
      
      if (!isNaN(month) && !isNaN(day) && !isNaN(year) && 
          month >= 0 && month < 12 && 
          day >= 1 && day <= new Date(year, month + 1, 0).getDate()) {
        setCurrentMonth(month);
        setCurrentYear(year);
        setSelectedDay(day);
      }
    }
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    setSelectedDay(day);
    
    // Update month/year if clicking on prev/next month days
    if (!isCurrentMonth) {
      if (day > 20) { // Previous month
        handlePrevMonth();
      } else { // Next month
        handleNextMonth();
      }
    }
    
    // Format the date as MM/DD/YYYY
    const monthStr = (currentMonth + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    setDate(`${monthStr}/${dayStr}/${currentYear}`);
  };

  return (
    <Box className={className} sx={{ width: '100%' }}>
      {/* Time Remaining Section */}
      <Paper sx={{ 
        ...whiteCardStyle,
        mb: 3, 
        p: 2
      }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 400, color: '#000000' }}>
          Time remaining
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Box 
            sx={{ 
              width: '60px',
              height: '50px',
              bgcolor: '#FF6B35', 
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 400 }}>
              {hours}
            </Typography>
          </Box>
          
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000000' }}>:</Typography>
          
          <Box 
            sx={{ 
              width: '60px',
              height: '50px',
              bgcolor: '#E7E7E7', 
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: '#333', fontWeight: 400 }}>
              {minutes}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mt: 0.5,
          mx: '30px'
        }}>
          <Typography variant="caption" sx={{ color: '#000000' }}>Hour</Typography>
          <Typography variant="caption" sx={{ color: '#000000' }}>Minute</Typography>
        </Box>
      </Paper>

      {/* Date Input */}
      <Box sx={{ 
        mb: 3,
      }}>
        <Typography variant="body2" sx={{ mb: 1, color: '#ffffff', fontWeight: 400 }}>
          Date
        </Typography>
        
        <TextField
          fullWidth
          value={date}
          onChange={handleDateChange}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'transparent',
              color: '#ffffff',
              borderRadius: '5px',
              borderColor: '#FF6B35',
              height: '45px',
              '& fieldset': {
                borderColor: '#FF6B35',
                borderWidth: '2px'
              },
              '&:hover fieldset': {
                borderColor: '#FF6B35'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF6B35'
              }
            },
            '& .MuiInputBase-input': {
              padding: '8px 12px',
              fontSize: '15px'
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayIcon sx={{ color: '#ffffff', cursor: 'pointer', fontSize: '20px', mr: 0.5 }} />
              </InputAdornment>
            ),
            sx: {
              pr: 1,
              border: '2px solid #FF6B35',
              borderRadius: '5px'
            }
          }}
        />
        
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#ffffff' }}>
          MM/DD/YYYY
        </Typography>
      </Box>

      {/* Calendar Widget */}
      <Paper sx={{ 
        ...whiteCardStyle,
        p: 2,
        bgcolor: 'white'
      }}>
        {/* Month and Year Selector */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          color: '#000000'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={handlePrevMonth} sx={{ color: '#000000', p: 0 }}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 1, fontWeight: 500 }}>{displayMonth}</Typography>
            <IconButton size="small" onClick={handleNextMonth} sx={{ color: '#000000', p: 0 }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={handlePrevYear} sx={{ color: '#000000', p: 0 }}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ mx: 1, fontWeight: 500 }}>{currentYear}</Typography>
            <IconButton size="small" onClick={handleNextYear} sx={{ color: '#000000', p: 0 }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        {/* Calendar Grid */}
        <Box sx={{ width: '100%' }}>
          {/* Day Headers */}
          <Grid container>
            {daysOfWeek.map((day, index) => (
              <Grid item key={index} xs={12/7} sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#000000', fontWeight: 500 }}>{day}</Typography>
              </Grid>
            ))}
          </Grid>
          
          {/* Calendar Days */}
          {calendarDays.map((week, weekIndex) => (
            <Grid container key={weekIndex} sx={{ mt: 0.5 }}>
              {week.map((day, dayIndex) => (
                <Grid item key={dayIndex} xs={12/7} sx={{ textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      width: '30px', 
                      height: '30px',
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      bgcolor: (day.isCurrentMonth && day.day === selectedDay) ? '#FF6B35' : 'transparent',
                      color: (day.isCurrentMonth && day.day === selectedDay) ? 'white' : 
                             day.isCurrentMonth ? '#000000' : '#AAAAAA',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: (day.isCurrentMonth && day.day === selectedDay) ? '#FF6B35' : 'rgba(0,0,0,0.05)'
                      }
                    }}
                    onClick={() => handleDayClick(day.day, day.isCurrentMonth)}
                  >
                    {day.day}
                  </Box>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Calendar; 