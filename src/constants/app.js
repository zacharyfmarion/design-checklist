/**
 * Configuration file for managing static details of the application
 */
import Rules from 'scenes/Rules';

export const title = 'SonarQube App';
export const shortTitle = 'SonarQube';
export const scenes = [
  {
    path: '/',
    icon: 'home',
    name: 'Rules',
    component: Rules,
  },
];
