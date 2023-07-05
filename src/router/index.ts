import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        // 若路由为空，重定位到dashboard（仪表盘）页面
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/',
                name: 'creatBlog',
                children:[
                    {
                        path: '/importBlog',
                        name: 'importBlog',
                        meta: {
                            title: '导入博客',
                            permiss: '1',
                        },
                        component: () => import(/* webpackChunkName: "importBlog" */ '../views/createBlog/importBlog.vue'),
                    },
                    {
                        path: '/editOnline',
                        name: 'editOnline',
                        meta: {
                            title: '在线编辑',
                            permiss: '1',
                        },
                        component: () => import(/* webpackChunkName: "editOnline" */ '../views/createBlog/editOnline.vue'),
                    }
                ]
            },
            {
                path: '/library',
                name: 'library',
                meta: {
                    title: '我的知识库',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "library" */ '../views/library.vue'),
            },
            {
                path: '/myBlogs',
                name: 'myBlogs',
                meta: {
                    title: '我的博客',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "myBlogs" */ '../views/myBlogs.vue'),
            },
            {
                path: '/tagConfig',
                name: 'tagConfig',
                meta: {
                    title: '标签设置',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "tagConfig" */ '../views/tagConfig.vue'),
            },
            {
                path: '/statistic',
                name: 'statistic',
                meta: {
                    title: '热度统计',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/statistic.vue'),
            },
            {
                path: '/comment',
                name: 'comment',
                meta: {
                    title: '评论管理',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "comment" */ '../views/comment.vue'),
            },
            {
                path: '/record',
                name: 'record',
                meta: {
                    title: '访问记录',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "record" */ '../views/record.vue'),
            },
            {
                path: '/editBlog',
                name: 'editBlog',
                meta: {
                    title: '编辑博客',
                    permiss: '1',
                },
                component: () => import(/* webpackChunkName: "statistic" */ '../views/editBlog.vue'),
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Plato-Manage-System`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
