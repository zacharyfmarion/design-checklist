// @flow
/**
 * Defines all the scences that will be active and also assigns
 * each scene useful information that is used in other places,
 * like icon and the route path it is mapped to
 */

import Checklist, { scenes as checklistScenes } from './Checklist';
import Graphs from './Graphs';
import Statistics from './Statistics';
import Duplication from './Duplication';
import Welcome from './Welcome';

// welcome is the route that shows up first to the user
export const defaultRoute = {
  path: '/welcome',
  icon: null,
  name: 'Welcome',
  component: Welcome,
};

export default [
  {
    path: '/checklist',
    icon: 'check-circle-o',
    name: 'Checklist',
    component: Checklist,
    scenes: checklistScenes,
  },
  {
    path: '/duplication',
    icon: 'switcher',
    name: 'Code Duplication',
    component: Duplication,
    scenes: [],
  },
  {
    path: '/statistics',
    icon: 'share-alt',
    name: 'Statistics',
    component: Statistics,
    scenes: [],
  },
  {
    path: '/graphs',
    icon: 'area-chart',
    name: 'Graphs',
    component: Graphs,
    scenes: [],
  },
];
