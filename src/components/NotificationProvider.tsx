import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const pollInterval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unread-count'] });
    }, 30000); 

    return () => clearInterval(pollInterval);
  }, [queryClient]);

  return <>{children}</>;
}

export default NotificationProvider;
