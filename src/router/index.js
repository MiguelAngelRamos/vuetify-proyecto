import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: {name: 'my-login'}
  },
  {
    path: '/login',
    name: 'my-login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterView.vue')
  },
  {
  
    path: '/products',
    name: 'products-app',
    component: () => import(/* webpackChunkName: "Productos" */ '../products/HomeProducts.vue'),
    // meta: { requiresAuth: true},
    children: [
      {  //* localhost:3000/products/
        path: '',
        name: 'list-products',
        // meta: { requiresAuth: true},
        component: () => import(/* webpackChunkName: "ListaProductos" */ '../products/views/ListProductsView.vue')
      },
      {
        //* localhost:3000/products/2
        path: ':id',
        name: 'product-id',
        meta: { requiresAuth: true},
        component: () => import(/* webpackChunkName: "ProductoId" */ '../products/views/ProductByIdView.vue')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//* la lógica para las rutas protegidas
router.beforeEach((to, from, next) => {
  //* Vamos recorrer cada una de las rutas
  if(to.matched.some(record => record.meta.requiresAuth)) {
    let usuarioValido = false;
    console.log('Ruta Protegida');
    // const usuario = isAuth(); //* puede ser verdadero o falso
    // console.log(usuario);
    //* Obtener la información del local storage
    let auth = localStorage.getItem('isAuth');
    console.log('auth del localstorage' + auth);
    auth=='false' || auth == null ? usuarioValido = false: usuarioValido = true;
    if(!usuarioValido) {
      next({path: '/login'})
    } else {
      next(); // * lo dejamos pasar hacia los productos
    }
  } else {
    next(); //* para aquellas rutas que no tengan el requiresAuth las dejamos pasar es decir next();
  }
});

export default router
