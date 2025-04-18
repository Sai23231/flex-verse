import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  IconButton,
  TextField,
  Input,
  Avatar
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  ExpandLess as ExpandLessIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

// Import profile image
import profilePicImg from '../../User/assets/profile_pic.png';

// Styles for the white cards
const whiteCardStyle = {
  background: 'white',
  borderRadius: '25px',
  boxShadow: '0 8px 30px 0 rgba(0, 0, 0, 0.18)',
  overflow: 'hidden',
  height: '100%'
};

// Custom scrollbar styles
const customScrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '6px',
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 107, 53, 0.6)',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 107, 53, 0.8)',
  }
};

interface Bill {
  service: string;
  date: string;
  amount: string;
}

interface HistoryItem {
  activity: string;
  date: string;
  completed: boolean;
}

interface ProfileContentProps {
  layout?: 'profile' | 'bills' | 'history';
}

interface InputEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {
  target: HTMLInputElement | HTMLTextAreaElement;
}

const ProfileContent = (props: ProfileContentProps) => {
  const { layout = 'profile' } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [billsExpanded, setBillsExpanded] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(profilePicImg);
  const [isEditing, setIsEditing] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: 'Abubackar Sidhiq',
    age: '20',
    email: 'Sidhiq2005@gmail.com',
    mobile: '9321887852',
    address: 'Hotspot, Mission Unicorn, Vidyalankar, Mumbai',
  });

  const [tempUserInfo, setTempUserInfo] = useState({...userInfo});

  const [bills] = useState<Bill[]>([
    { service: 'Trainer', date: '06/10/2025', amount: '200$' },
    { service: 'Dietition - Name', date: '06/10/2025', amount: '100$' },
    { service: 'Gym subscription', date: '06/10/2025', amount: '1500$' },
    { service: 'Dietition - Name', date: '06/10/2025', amount: '100$' },
    { service: 'Dietition - Name', date: '06/10/2025', amount: '100$' },
    { service: 'Dietition - Name', date: '06/10/2025', amount: '100$' },
    { service: 'Dietition - Name', date: '06/10/2025', amount: '100$' },
    { service: 'Personal Training', date: '05/10/2025', amount: '300$' },
    { service: 'Yoga Class', date: '04/10/2025', amount: '150$' },
    { service: 'Massage Therapy', date: '03/10/2025', amount: '120$' },
    { service: 'Swimming Lessons', date: '02/10/2025', amount: '80$' },
    { service: 'Wellness Coaching', date: '01/10/2025', amount: '250$' },
    { service: 'Fitness Assessment', date: '30/09/2025', amount: '75$' },
    { service: 'Nutritional Coaching', date: '29/09/2025', amount: '110$' },
  ]);

  const [history] = useState<HistoryItem[]>([
    { activity: 'Day: 16 - Leg', date: '06/10/2025', completed: true },
    { activity: 'Day: 15 - Leg', date: '06/10/2025', completed: false },
    { activity: 'Day: 14 - Shoulder', date: '06/10/2025', completed: true },
    { activity: 'Day: 13 - Arms', date: '06/10/2025', completed: true },
    { activity: 'Day: 12 - Weight lifting', date: '06/10/2025', completed: true },
    { activity: 'Day: 11 - Meditation', date: '06/10/2025', completed: true },
    { activity: 'Day: 10 - Yoga', date: '06/10/2025', completed: true },
    { activity: 'Day: 9 - Cardio', date: '05/10/2025', completed: true },
    { activity: 'Day: 8 - Swimming', date: '04/10/2025', completed: true },
    { activity: 'Day: 7 - Rest Day', date: '03/10/2025', completed: true },
    { activity: 'Day: 6 - Full Body', date: '02/10/2025', completed: false },
    { activity: 'Day: 5 - HIIT Training', date: '01/10/2025', completed: true },
    { activity: 'Day: 4 - Core Workout', date: '30/09/2025', completed: true },
    { activity: 'Day: 3 - Stretching', date: '29/09/2025', completed: true },
    { activity: 'Day: 2 - Kickboxing', date: '28/09/2025', completed: true },
    { activity: 'Day: 1 - Introduction', date: '27/09/2025', completed: true },
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    
    // Changed by Harsh Jain - Enhanced image upload functionality
    const file = event.target.files?.[0];
    if (file) {
      // Changed by Harsh Jain - Added local URL creation for immediate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setTempUserInfo({...userInfo});
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleInfoChange = (field: keyof typeof userInfo) => (event: InputEvent) => {
    setTempUserInfo(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const saveChanges = () => {
    setUserInfo({...tempUserInfo});
    setIsEditing(false);
  };

  const toggleBillsExpanded = () => {
    setBillsExpanded(!billsExpanded);
  };

  if (layout === 'bills') {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          ...whiteCardStyle,
          p: 0,
          height: billsExpanded ? '380px' : '280px',
          display: 'flex',
          flexDirection: 'column',
          mb: billsExpanded ? 2 : 2,
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.15rem' }}>My Bills</Typography>
        </Box>

        <TableContainer sx={{ 
          flexGrow: 1,
          overflow: 'auto',
          ...customScrollbarStyles 
        }}>
          <Table size="small" sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  borderBottom: '1px solid #eee', 
                  fontSize: '0.85rem', 
                  py: 1, 
                  px: 2, 
                  width: '40%',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1
                }}>Service</TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #eee', 
                  fontSize: '0.85rem', 
                  py: 1, 
                  px: 2, 
                  width: '30%',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1
                }}>Date</TableCell>
                <TableCell sx={{ 
                  borderBottom: '1px solid #eee', 
                  fontSize: '0.85rem', 
                  py: 1, 
                  px: 2, 
                  width: '30%',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'white',
                  zIndex: 1
                }} align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(bills.length > 0 ? bills : [
                { service: 'No bills found', date: '-', amount: '-' }
              ]).slice(0, billsExpanded ? bills.length : 3).map((bill, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderBottom: '1px solid #eee', fontSize: '0.85rem', py: 1.2, px: 2 }}>{bill.service}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #eee', fontSize: '0.85rem', py: 1.2, px: 2 }}>{bill.date}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #eee', fontSize: '0.85rem', py: 1.2, px: 2 }} align="right">{bill.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          py: 1, 
          borderTop: '1px solid #eee',
          mt: 'auto'
        }}>
          <Typography 
            onClick={toggleBillsExpanded}
            sx={{ 
              color: '#555555', 
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              "&:hover": {
                textDecoration: 'underline'
              }
            }}
          >
            Show {billsExpanded ? "less" : "more"} {billsExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </Typography>
        </Box>
      </Paper>
    );
  }

  if (layout === 'history') {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          ...whiteCardStyle,
          p: 2,
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: '1.15rem' }}>History</Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 0, 
          flexGrow: 1,
          overflow: 'auto',
          overflowX: 'hidden',
          ...customScrollbarStyles 
        }}>
          {(history.length > 0 ? history : [
            { activity: 'No history found', date: '-', completed: false }
          ]).slice(0, 7).map((item, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              py: 1.2,
              px: 1.5,
              borderBottom: index === 6 ? 'none' : '1px solid #eee'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>{item.activity}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexShrink: 0 }}>
                <Typography variant="body2" sx={{ color: '#555555', fontSize: '0.85rem' }}>
                  {item.date}
                </Typography>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: item.completed ? '#4CAF50' : '#F44336',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  }

  if (layout === 'profile') {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          ...whiteCardStyle,
          p: 0,
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)',
          height: '100%',
          maxWidth: '400px',
          width: '100%',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          width: '100%',
          pt: 3,
          pb: 2
        }}>
          {/* Profile Picture */}
          <Box
            sx={{
              width: '140px',
              height: '140px',
              borderRadius: '25px',
              overflow: 'hidden',
              border: '4px solid #FF6B35',
              position: 'relative',
              mb: 2,
              cursor: isEditing ? 'pointer' : 'default',
              transition: 'all 0.2s ease',
              '&:hover': {
                opacity: isEditing ? 0.9 : 1
              },
              bgcolor: '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            {profileImage && !profileImage.includes('undefined') ? (
              <Box
                component="img"
                src={profileImage}
                alt="Profile"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  console.log("Image error:", e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none'; // Hide on error
                }}
              />
            ) : (
              <Typography 
                sx={{ 
                  fontSize: '60px', 
                  fontWeight: 'bold', 
                  color: '#FF6B35', 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {userInfo.name.charAt(0).toUpperCase()}
              </Typography>
            )}
            <Input
              type="file"
              inputRef={fileInputRef}
              onChange={handleImageUpload}
              sx={{ display: 'none' }}
              inputProps={{
                accept: "image/*",
                disabled: !isEditing
              }}
            />
            {isEditing && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '8px',
                  textAlign: 'center',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  fontSize: '0.9rem'
                }}
              >
                Change Photo
              </Box>
            )}
          </Box>

          {/* Name and Age */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.25,
              fontSize: '1.25rem',
              textAlign: 'center',
              width: '90%'
            }}
          >
            {isEditing ? (
              <TextField
                value={tempUserInfo.name}
                onChange={handleInfoChange('name')}
                variant="standard"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    '&::before': { display: 'none' },
                    '&::after': { display: 'none' }
                  },
                  disableUnderline: true
                }}
              />
            ) : userInfo.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666', 
              fontSize: '0.9rem',
              textAlign: 'center',
              pb: 1.5,
              borderBottom: '1px solid #eee',
              width: '90%'
            }}
          >
            Age: {isEditing ? (
              <TextField
                value={tempUserInfo.age}
                onChange={handleInfoChange('age')}
                variant="standard"
                size="small"
                type="number"
                InputProps={{
                  sx: {
                    fontSize: '0.9rem',
                    width: '30px',
                    '&::before': { display: 'none' },
                    '&::after': { display: 'none' }
                  },
                  disableUnderline: true
                }}
              />
            ) : userInfo.age}
          </Typography>
        </Box>

        {/* Contact Information */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '90%',
          mx: 'auto',
          pb: 3
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700, 
                fontSize: '1.15rem',
                color: '#333'
              }}
            >
              Contact information
            </Typography>
            
            {!isEditing ? (
              <IconButton 
                size="small" 
                color="primary" 
                onClick={startEditing}
                sx={{ 
                  backgroundColor: '#f44336',
                  color: 'white',
                  p: 0.7,
                  '&:hover': {
                    backgroundColor: '#d32f2f'
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton 
                size="small" 
                color="primary" 
                onClick={cancelEditing}
                sx={{ 
                  backgroundColor: '#f44336',
                  color: 'white',
                  p: 0.7,
                  '&:hover': {
                    backgroundColor: '#d32f2f'
                  }
                }}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#757575', 
                  fontSize: '0.9rem',
                  mb: 0.5,
                  fontWeight: 500
                }}
              >
                email id :
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  type="email" 
                  value={tempUserInfo.email}
                  onChange={handleInfoChange('email')}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      }
                    }
                  }}
                  InputProps={{
                    sx: {
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderRadius: '4px',
                      py: 0.7
                    }
                  }}
                />
              ) : (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500, 
                    fontSize: '1rem',
                    color: '#333',
                    py: 0.7,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {userInfo.email}
                </Typography>
              )}
            </Box>
            
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#757575', 
                  fontSize: '0.9rem',
                  mb: 0.5,
                  fontWeight: 500
                }}
              >
                Mobile number:
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  type="tel" 
                  value={tempUserInfo.mobile}
                  onChange={handleInfoChange('mobile')}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      }
                    }
                  }}
                  InputProps={{
                    sx: {
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderRadius: '4px',
                      py: 0.7
                    }
                  }}
                />
              ) : (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500, 
                    fontSize: '1rem',
                    color: '#333',
                    py: 0.7,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {userInfo.mobile}
                </Typography>
              )}
            </Box>
            
            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#757575', 
                  fontSize: '0.9rem',
                  mb: 0.5,
                  fontWeight: 500
                }}
              >
                Address:
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={tempUserInfo.address}
                  onChange={handleInfoChange('address')}
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e0e0e0'
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B35'
                      }
                    }
                  }}
                  InputProps={{
                    sx: {
                      fontSize: '1rem',
                      fontWeight: 500,
                      borderRadius: '4px'
                    }
                  }}
                />
              ) : (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontWeight: 500, 
                    fontSize: '1rem',
                    color: '#333',
                    py: 0.7,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {userInfo.address}
                </Typography>
              )}
            </Box>
          </Box>
          
          {isEditing && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained"
                onClick={saveChanges}
                sx={{ 
                  bgcolor: '#FF6B35',
                  '&:hover': { bgcolor: '#ff824f' },
                  borderRadius: '50px',
                  padding: '10px 60px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)'
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        ...whiteCardStyle,
        p: 0
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
        <Box
          sx={{
            width: '130px',
            height: '130px',
            borderRadius: '30px',
            overflow: 'hidden',
            border: '5px solid #FF6B35',
            position: 'relative',
            mb: 2,
            cursor: isEditing ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            '&:hover': {
              opacity: isEditing ? 0.9 : 1
            }
          }}
          onClick={() => isEditing && fileInputRef.current?.click()}
        >
          <Avatar
            src={profileImage}
            alt="Profile"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Input
            type="file"
            inputRef={fileInputRef}
            onChange={handleImageUpload}
            sx={{ display: 'none' }}
            inputProps={{
              accept: "image/*",
              disabled: !isEditing
            }}
          />
          {isEditing && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '8px',
                textAlign: 'center',
                color: 'white',
                transition: 'all 0.3s ease',
              }}
            >
              Change Photo
            </Box>
          )}
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0 }}>
          {isEditing ? tempUserInfo.name : userInfo.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#555555', mb: 1 }}>
          Age: {isEditing ? tempUserInfo.age : userInfo.age}
        </Typography>

        <Divider sx={{ width: '100%', my: 1 }} />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          px: 3,
          alignItems: 'center'
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Contact information
          </Typography>
          
          {!isEditing ? (
            <IconButton 
              size="small" 
              color="primary" 
              onClick={startEditing}
              sx={{ mb: 2 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton size="small" color="error" onClick={cancelEditing}>
                <CancelIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="success" onClick={saveChanges}>
                <SaveIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
        
        <Box sx={{ width: '100%', pl: 3, pr: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#757575', 
                fontSize: '0.85rem',
                mb: 0.5
              }}
            >
              email id :
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="email" 
                value={tempUserInfo.email}
                onChange={handleInfoChange('email')}
                variant="outlined"
                size="small"
                margin="dense"
                InputProps={{
                  sx: {
                    fontSize: '14px',
                    borderRadius: '4px',
                  }
                }}
              />
            ) : (
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500, 
                  fontSize: '0.95rem',
                  color: '#333'
                }}
              >
                {userInfo.email}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#757575', 
                fontSize: '0.85rem',
                mb: 0.5
              }}
            >
              Mobile number:
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="tel" 
                value={tempUserInfo.mobile}
                onChange={handleInfoChange('mobile')}
                variant="outlined"
                size="small"
                margin="dense"
                InputProps={{
                  sx: {
                    fontSize: '14px',
                    borderRadius: '4px',
                  }
                }}
              />
            ) : (
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500, 
                  fontSize: '0.95rem',
                  color: '#333'
                }}
              >
                {userInfo.mobile}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#757575', 
                fontSize: '0.85rem',
                mb: 0.5
              }}
            >
              Address:
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={tempUserInfo.address}
                onChange={handleInfoChange('address')}
                variant="outlined"
                size="small"
                margin="dense"
                InputProps={{
                  sx: {
                    fontSize: '14px',
                    borderRadius: '4px',
                  }
                }}
              />
            ) : (
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500, 
                  fontSize: '0.95rem',
                  color: '#333'
                }}
              >
                {userInfo.address}
              </Typography>
            )}
          </Box>
          
          {isEditing && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
              <Button 
                variant="contained"
                onClick={saveChanges}
                sx={{ 
                  bgcolor: '#FF6B35',
                  '&:hover': { bgcolor: '#ff824f' },
                  borderRadius: '50px',
                  padding: '8px 45px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '16px',
                  boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)'
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileContent; 