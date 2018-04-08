// @flow
/**
 * Defines all the scences that will be active and also assigns
 * each scene useful information that is used in other places,
 * like icon and the route path it is mapped to
 */

import Checklist from './Checklist';
import Graphs from './Graphs';
import Statistics from './Statistics';
import Duplication from './Duplication';
import Overview from './Overview';

export default [
  // {
  //   path: '/overview',
  //   icon: 'appstore-o',
  //   name: 'Overview',
  //   component: Overview,
  // },
  {
    path: '/checklist',
    icon: 'check-circle-o',
    name: 'Checklist',
    component: Checklist,
  },
  {
    path: '/duplication',
    icon: 'switcher',
    name: 'Code Duplication',
    component: Duplication,
  },
  {
    path: '/statistics',
    icon: 'share-alt',
    name: 'Statistics',
    component: Statistics,
  },
  {
    path: '/graphs',
    icon: 'area-chart',
    name: 'Graphs',
    component: Graphs,
  },
];
