import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/practicce',
          name: 'practice',
          component: () => import('./views/practice.vue'),
          meta:{
            requiresVisitor: true
          }
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/user_pages/userList.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/documents',
          name: 'documents',
          component: () => import('./views/document_pages/documentList.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/user/:username',
          name: 'user',
          component: () => import('./views/user_pages/userProfile.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/document/:docID',
          name: 'document',
          component: () => import('./views/document_pages/documentData.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/departments',
          name: 'departments',
          component: () => import('./views/departments/departments.vue'),
          meta:{
            requiresAuth: true
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          meta:{
            requiresVisitor: true
          }
        },
        {
          path: '/pages/logout',
          name: 'page-logout',
          component: () => import('@/views/pages/Logout.vue'),
          meta:{
            requiresAuth: true
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
