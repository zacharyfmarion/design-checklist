/**
 * Configuration file for managing static details of the application
 */
import Rules from 'scenes/Rules';
import Graphs from 'scenes/Graphs';

export const title = 'SonarQube App';
export const shortTitle = 'SonarQube';
export const sessionStoragePrefix = 'sonarqube';
export const scenes = [
  {
    path: '/',
    icon: 'exclamation',
    name: 'Analysis',
    component: Rules
  }
  // {
  //   path: '/graphs',
  //   icon: 'graph',
  //   name: 'Graphs',
  //   component: Graphs,
  // },
];
