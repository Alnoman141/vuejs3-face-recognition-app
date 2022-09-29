const AppRouterViewComponent = () => import('@/components/AppRouterViewComponent.vue');
const UserListComponent = () => import('@/views/users/index.vue');
const UserCreateComponent = () => import('@/views/users/create.vue');

const userRoutes = {
    path: '/users',
    component: AppRouterViewComponent,
    hidden: true,
    children: [
        {
            path: '',
            name: 'userList',
            component: UserListComponent
        },
        {
            path: 'create',
            name: 'userCreate',
            component: UserCreateComponent
        },
    ]
}


export default userRoutes;