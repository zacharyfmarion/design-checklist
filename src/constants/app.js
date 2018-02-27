/**
 * Configuration file for managing static details of the application
 */
import Checklist from 'scenes/Checklist';
import Graphs from 'scenes/Graphs';
import Statistics from 'scenes/Statistics';
import Duplication from 'scenes/Duplication';

export const VERSION = '0.0.3';
export const title = 'Design Checkup';
export const shortTitle = 'Checkup';
export const sessionStoragePrefix = `sonarqube_${VERSION}`;
export const analyticsId = 'UA-114050502-1';
export const scenes = [
  {
    path: '/checklist',
    icon: 'check-circle-o',
    name: 'Checklist',
    component: Checklist
  },
  {
    path: '/duplication',
    icon: 'switcher',
    name: 'Code Duplication',
    component: Duplication
  },
  {
    path: '/statistics',
    icon: 'share-alt',
    name: 'Statistics',
    component: Statistics
  }
  // {
  //   path: '/graphs',
  //   icon: 'area-chart',
  //   name: 'Graphs',
  //   component: Graphs,
  // },
];
