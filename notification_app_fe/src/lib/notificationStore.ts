const STORAGE_KEY = 'notification_read_state';

export interface ReadState {
  [notificationId: string]: boolean;
}

export const getReadState = (): ReadState => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
};

export const markNotificationAsRead = (notificationId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const state = getReadState();
    state[notificationId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const isNotificationRead = (notificationId: string): boolean => {
  const state = getReadState();
  return state[notificationId] || false;
};

export const clearReadState = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
