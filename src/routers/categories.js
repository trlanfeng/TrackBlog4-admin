import routesHelper from './helper';

import CategoriesList from '../views/Categories/List.vue';
import CategoriesAdd from '../views/Categories/Add.vue';

export default routesHelper('categories', [
  {
    path: '/',
    name: 'categories',
    component: CategoriesList,
    meta: {
      title: '分类管理',
    },
  },
  {
    path: '/add',
    component: CategoriesAdd,
    meta: {
      title: '增加分类',
    },
  },
  {
    path: '/edit/:id',
    component: CategoriesAdd,
    meta: {
      title: '编辑分类',
    },
  },
]);
