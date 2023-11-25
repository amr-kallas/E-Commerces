let API_ROUTES = {
  SIGN: {
    root: '',
    REGISTER: 'register',
    LOGIN: 'login',
    GOOGLE: 'auth/google/callback',
  },
  USERS: {
    root: '',
    ALL: 'users',
    ME: 'user',
    LOGOUT: 'logout',
    GET: (id: string) => `user/${id}`,
    EDIT: (id: string) => `user/edit/${id}`,
    DELETE: (id: string) => `user/${id}`,
    ADD: 'user/add',
  },
  CATEGORY: {
    ALL: 'categories',
    ADD: 'category/add',
    GET: (id: string) => `category/${id}`,
    EDIT: (id: string) => `category/edit/${id}`,
    DELETE: (id: string) => `category/${id}`,
  },
  PRODUCT: {
    ALL: 'products',
    ADD: 'product/add',
    ADD_IMG: 'product-img/add',
    GET: (id: string) => `product/${id}`,
    EDIT: (id: string) => `product/edit/${id}`,
    DELETE: (id: string) => `product/${id}`,
    DELETE_IMG: (id: string) => `product-img/${id}`,
  },
}

export default API_ROUTES
