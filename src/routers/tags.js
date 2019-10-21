import routesHelper from './helper';

import TagsList from '../views/Tags/List.vue';
import TagsAdd from '../views/Tags/Add.vue';

export default routesHelper('tags', [
  {
    path: '/',
    name: 'tags',
    component: TagsList,
    meta: {
      title: '标签管理',
    },
  },
  {
    path: '/add',
    component: TagsAdd,
    meta: {
      title: '增加标签',
    },
  },
  {
    path: '/edit/:id',
    component: TagsAdd,
    meta: {
      title: '编辑标签',
    },
  },
]);
