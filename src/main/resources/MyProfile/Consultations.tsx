import { useEffect, useState } from 'react';

import { profileApi } from '../../API/ProfileApi';
import ConsultationsList from './ConsultationsList';

export const Consultations = () => {
  const [active, setActive] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  useEffect(() => {
    profileApi.getConsultationsCounts().then((response) => {
      setActive(response.totalPending);
      setCompleted(response.totalCompleted);
    });
  }, []);
  return (
    <div>
      <ConsultationsList
        loggedInUserRole="APP_USER"
        totalItems={active}
        activeConsultations={true}
        completedOrCancelledConsultations={false}
      />
      <ConsultationsList
        loggedInUserRole="APP_USER"
        totalItems={completed}
        activeConsultations={false}
        completedOrCancelledConsultations={true}
      />
    </div>
  );
};
