/**
 * Configuration file for managing static details of the application
 */
import Rules from 'scenes/Rules';
import Graphs from 'scenes/Graphs';

export const title = 'Design Checklist';
export const shortTitle = 'Checklist';
export const sessionStoragePrefix = 'sonarqube';
export const scenes = [
  {
    path: '/checklist',
    icon: 'check-circle-o',
    name: 'Checklist',
    component: Rules
  },
  {
    path: '/duplication',
    icon: 'switcher',
    name: 'Code Duplication',
    component: null
  },
  {
    path: '/graphs',
    icon: 'area-chart',
    name: 'Graphs',
    component: Graphs
  },
  {
    path: '/statistics',
    icon: 'share-alt',
    name: 'Statistics',
    component: null
  }
];
