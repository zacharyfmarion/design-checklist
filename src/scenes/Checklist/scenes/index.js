import ByCategory from './ByCategory';
import ByFile from './ByFile';

export default [
  {
    path: '/checklist/by-category',
    icon: 'appstore-o',
    name: 'By Category',
    component: ByCategory,
  },
  {
    path: '/checklist/by-file',
    icon: 'file-text',
    name: 'By File',
    component: ByFile,
  },
];
