import routesHelper from './helper';

import AdminsList from '../views/Admins/List.vue';
import AdminsAdd from '../views/Admins/Add.vue';

export default routesHelper('admins', [
  {
    path: '/',
    component: AdminsList,
    meta: {
      title: '管理员列表',
    },
  },
  {
    path: '/add',
    component: AdminsAdd,
    meta: {
      title: '添加管理员',
    },
  },
  {
    path: '/edit/:id',
    component: AdminsAdd,
    meta: {
      title: '编辑管理员',
    },
  },
]);
