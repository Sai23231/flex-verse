import React, { useEffect, useState } from 'react';

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return visible ? (
    <div className="error-notification">
      <p>{message}</p>
    </div>
  ) : null;
};

export default ErrorNotification;
