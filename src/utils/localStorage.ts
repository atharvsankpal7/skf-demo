import { User, Configuration } from '../types';

export const storageKeys = {
  USERS: 'bearing_users',
  CURRENT_USER: 'bearing_current_user',
  CONFIGURATIONS: 'bearing_configurations'
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem(storageKeys.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(storageKeys.USERS, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(storageKeys.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(storageKeys.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(storageKeys.CURRENT_USER);
  }
};

export const saveConfiguration = (config: Configuration): void => {
  const savedConfigs = localStorage.getItem(storageKeys.CONFIGURATIONS);
  const configs: Configuration[] = savedConfigs ? JSON.parse(savedConfigs) : [];
  configs.push(config);
  localStorage.setItem(storageKeys.CONFIGURATIONS, JSON.stringify(configs));
};

export const getAllConfigurations = (): Configuration[] => {
  const savedConfigs = localStorage.getItem(storageKeys.CONFIGURATIONS);
  return savedConfigs ? JSON.parse(savedConfigs) : [];
};

export const getUserConfigurations = (): Configuration[] => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  return getAllConfigurations().filter(config => config.userId === currentUser.id);
};