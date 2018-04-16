import ByCategory from './ByCategory';
import ByFile from './ByFile';

export default [
  {
    path: 'checklist/by-category',
    icon: 'check-circle-o',
    name: 'By Category',
    component: ByCategory,
  },
  {
    path: 'checklist/by-file',
    icon: 'check-circle-o',
    name: 'By File',
    component: ByFile,
  },
];
