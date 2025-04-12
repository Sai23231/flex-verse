import { useEffect, useState } from 'react';

import { profileApi } from '../../API/ProfileApi';
import ConsultationsList from './ConsultationsList';

export const MyCustomers = () => {
  const [active, setActive] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  useEffect(() => {
    profileApi.getMyCustomerCounts().then((response) => {
      setActive(response.totalPending);
      setCompleted(response.totalCompleted);
    });
  }, []);
  return (
    <div>
      <ConsultationsList
        loggedInUserRole="CONSULTANT"
        totalItems={active}
        activeConsultations={true}
        completedOrCancelledConsultations={false}
      />
      <ConsultationsList
        loggedInUserRole="CONSULTANT"
        totalItems={completed}
        activeConsultations={false}
        completedOrCancelledConsultations={true}
      />
    </div>
  );
};
