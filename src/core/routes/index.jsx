import Login from '@/pages/Login'
import AuthUrl from './AuthUrl'

export const routers = [
  {
    path: '',
    component: () => <Login />,
    children: [
      {
        path: '/',
        component: () => <Login />,
        forceAuth: true,
      },
      {
        path: '/login',
        component: () => <Login />,
        forceAuth: true,
      },
    ],
  },
  {
    path: '',
    component: () => <LayoutIndex />,
    children: [
      {
        path: '/home',
        component: lazy(() => import('@/pages/home')),
        forceAuth: true,
      },
    ],
  },
  {
    path: '',
    component: () => <LayoutIndex />,
    children: [
      {
        path: '/user/list',
        component: lazy(() => import('@/pages/userManagement/User')),
      },
      {
        path: '/role/list',
        component: lazy(() => import('@/pages/userManagement/Role')),
      },
    ],
  },
  {
    path: '',
    component: () => <LayoutIndex />,
    children: [
      {
        path: '/examine/commentary',
        component: lazy(() => import('@/pages/examine/Commentary')),
      },
    ],
  },
  {
    path: '',
    component: () => <LayoutIndex />,
    children: [
      {
        path: '*',
        component: lazy(() => import('@/pages/403')),
        forceAuth: true,
      },
    ],
  },
  {
    path: '/chooseCity',
    component: lazy(() => import('@/pages/chooseCity')),
    forceAuth: true,
  },
  {
    path: '/weChat',
    component: lazy(() => import('@/pages/weChat')),
    forceAuth: true,
  },
]

export const changeRouter = (routers) => {
  return routers.map((route) => {
    if (route.children) {
      route.children = changeRouter(route.children)
      route.element = (
        <Suspense>
          <route.component />
        </Suspense>
      )
    } else {
      route.element = (
        <Suspense>
          <AuthUrl
            forceAuth={
              !import.meta.env.VITE_NEED_ROUTE_CHECK || route.forceAuth
            }
          >
            <route.component />
          </AuthUrl>
        </Suspense>
      )
    }
    return route
  })
}

export const getRouters = () => changeRouter(routers)
