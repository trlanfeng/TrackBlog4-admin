import routesHelper from './helper';

import SeriesList from '../views/Series/List.vue';
import SeriesAdd from '../views/Series/Add.vue';

export default routesHelper('series', [
  {
    path: '/',
    name: 'series',
    component: SeriesList,
    meta: {
      title: '系列管理',
    },
  },
  {
    path: '/add',
    component: SeriesAdd,
    meta: {
      title: '增加系列',
    },
  },
  {
    path: '/edit/:id',
    component: SeriesAdd,
    meta: {
      title: '编辑系列',
    },
  },
]);
