import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

export interface GroupedAppointment {
  date: string;
  timeslots: string[];
}

interface AvailableAppointmentsProps {
  appointments: GroupedAppointment[];
}

const AvailableAppointments: React.FC<AvailableAppointmentsProps> = ({
  appointments,
}) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        My Available Appointments:
      </Typography>
      {appointments.length === 0 ? (
        <Typography>No available appointments.</Typography>
      ) : (
        appointments.map((groupedAppointment, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{`Date: ${groupedAppointment.date}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {groupedAppointment.timeslots.map((timeSlot, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <ListItem>
                      <ListItemText primary={`Time: ${timeSlot}`} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default AvailableAppointments;
