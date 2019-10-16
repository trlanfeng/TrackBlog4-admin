import routesHelper from './helper';

import ArticlesList from '../views/Articles/List.vue';
import ArticlesAdd from '../views/Articles/Add.vue';

export default routesHelper('articles', [
  {
    path: '/',
    name: 'articles',
    component: ArticlesList,
    meta: {
      title: '文章管理',
    },
  },
  {
    path: '/add',
    component: ArticlesAdd,
    meta: {
      title: '增加文章',
    },
  },
  {
    path: '/edit/:id',
    component: ArticlesAdd,
    meta: {
      title: '编辑文章',
    },
  },
]);
