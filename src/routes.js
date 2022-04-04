import React from 'react'

//System Routes
const Accounts = React.lazy(() => import('./views/accounts/accounts/Accounts'))
const Categories = React.lazy(() => import('./views/accounts/categories/Categories'))
const CategoryInsert = React.lazy(() => import('./views/accounts/categories/CategoryInsert'))
const CategoryEdit = React.lazy(() => import('./views/accounts/categories/CategoryEdit'))

const routes = [
  //System Routes
  { path: '/accounts', name: 'Accounts', component: Accounts },
  { path: '/categories/edit', name: 'Edit category', component: CategoryEdit },
  { path: '/categories/insert', name: 'Insert category', component: CategoryInsert },
  { path: '/categories', name: 'Categories', component: Categories },

  //End System Routes
]

export default routes
