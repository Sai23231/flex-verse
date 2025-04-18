import React from 'react';

import { CalendarMonth } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

import type { ReactElement } from 'react';

interface CustomListItemProps {
  icon: ReactElement;
  text: string;
  index: number;
}

interface LeftSidePanelProps {
  setSelectedOption: (arg0: number) => void;
}

const LeftSidePanel: React.FC<LeftSidePanelProps> = ({ setSelectedOption }) => {
  const userDetails = useSelector(
    (state: any) => state.userDetails.loggedInUser
  );
  const CustomListItem: React.FC<CustomListItemProps> = ({
    icon,
    text,
    index,
  }) => {
    return (
      <div onClick={() => setSelectedOption(index)}>
        <ListItem
          component="div"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </div>
    );
  };
  return (
    <div
      style={{
        height: '80vh',
        backgroundColor: '#fff',
        borderRight: '1px solid #ccc',
      }}
    >
      <List>
        <CustomListItem
          icon={<AccountCircleIcon />}
          text="Account Details"
          index={0}
        />
        <CustomListItem icon={<PaymentIcon />} text="Payments" index={1} />
        <CustomListItem
          icon={<NotificationsIcon />}
          text="Notifications"
          index={2}
        />
        <CustomListItem
          icon={<AssignmentIcon />}
          text={userDetails?.roleId == 100 ? 'Consultations' : 'My Customers'}
          index={3}
        />
        <CustomListItem
          icon={<CalendarMonth />}
          text="Add Appointments"
          index={5}
        />
        {userDetails?.roleId == 100 ? (
          <CustomListItem
            icon={<FitnessCenterIcon />}
            text="Gym Memberships"
            index={4}
          />
        ) : (
          ''
        )}
        <CustomListItem icon={<ExitToAppIcon />} text="Log Out" index={5} />
      </List>
    </div>
  );
};

export default LeftSidePanel;
