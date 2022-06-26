# CRUD Laravel 8 y VueJS

## Fuentes

[CorneGramm Desarrollo Web - Web Development](https://www.youtube.com/playlist?list=PLki9ogssS_Jm-ghEkgDGeKJ2VLT31Tk1J)
[Laravel 8 + Vue + SPA + CRUD - Informática DP](https://www.youtube.com/playlist?list=PLrAw40DbN0l33O9tOstCiNsQdjpPYvjOj)

## Instalacion Laravel

Crear Proyecto con la ultima version de laravel
```
Laravel new laravue
```

o tal vez un proyecto con una version en especifico, por ejemplo version 8
```
composer create-project laravel/laravel laravue "8.*"
```

o una version aun mas especifica
```
composer create-project laravel/laravel laravue "5.5.*"
```

Lo encontré aqui [Fuente](https://cirelramos.blogspot.com/2016/11/laravel-crear-proyecto-en-version.html)

## Instalacion de Vue

crear un scaffolding con vue version 2
```
composer require laravel/ui
php artisan ui vue
```

descargamos las dependencias
```
npm install
```

luego compilamos y refrescamos una vez
```
npm run dev
```

si la compilacion falla, ejecutamos
```
npm update vue-loader
```

para compilar y se quede escuchando a cualquier cambio
```
npm run watch
```

## Instalacion de 2 paquetes


para la version vue 2 se instala vue-router 3. Lo malo que por defecto instala la version 4 el cual no es compatible con vue 2, pero podemos escoger la version 3 que queramos como la 3.5.1 o la ultima version
```
npm install vue-router@3.5.3
```

```
npm install vue-axios
```

## Creamos la parte backend

creamos el modelo
```
php artisan make:model Bookmark
```

creamos la migracion
```
php artisan make:migration create_bookmarks_table
```

configuramos nuestra migracion
```php
public function up()
{
  Schema::create('bookmarks', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('url');
    $table->timestamps();
  });
}
```

creamos el controlador
```
php artisan make:controller BookmarkController --resource
```

tambien se puede crear todo a la vez: modelo, migracion y controlador-resource
```
php artisan make:model Bookmark -mcr
```

## configuracion de rutas de laravel

rutas para laravel en ***web.php*** y quitamos la que viene por defecto
```
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
```

controlador en ***api.php***
```
Route::resource('bookmark',App\Http\Controllers\BookmarkController::class);
```

ver las rutas y controladores por pantalla
```
php artisan route:list
```

creamos dentro de ***resources/views*** el archivo ***app.blade.php***
```blade
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" value="{{ csrf_token() }}" />
    <title>CRUD Laravel + Vue</title>

    <!-- CDNs de Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- app.css -->
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
</head>

<body>
    <!-- contenido -->
    <div id="app">
    </div>

    <!-- app.js -->
    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>

</html>
```

creamos las ruras en ***routes.js***
```js
// componentes
const Home = () => import('./components/Home.vue')
const Contact = () => import('./components/Contact.vue')

//importamos los componentes para bookmark
const Show = () => import('./components/bookmark/Show.vue')
const Create = () => import('./components/bookmark/Create.vue')
const Edit = () => import('./components/bookmark/Edit.vue')

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'show-bookmark',
        path: '/show',
        component: Show
    },
    {
        name: 'create-bookmark',
        path: '/create',
        component: Create
    },
    {
        name: 'edit-bookmark',
        path: '/edit/:id',
        component: Edit
    },
    {
        name: 'contact',
        path: '/contact',
        component: Contact
    }
]
```

configuramos ***app.js***
```js
require('./bootstrap');

// importacion vue por default
// window.Vue = require('vue').default;

// otra forma de importar vue
import vue from 'vue'
window.Vue = vue;

// importamos el componente principal
import App from './components/App.vue';

// importamos Axios
import VueAxios from 'vue-axios';
import axios from 'axios';

// importamos y configuramos el Vue-router
import VueRouter from 'vue-router';
import { routes } from './routes';

// global para el proyecto
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// instanciamos VueRouter
const router = new VueRouter({
    mode: 'history',
    routes: routes
});

//finalmente, definimos nuestra app de Vue
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});
```

añadimos .vue() en ***webpack.mix***
```js
mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
```

cramos dentro de ***resources/js/components*** la carpeta ***Bookmark*** y sus ***componentes***. Ojo que App.vue sera nuestro componente principal 
```
components
---bookmark
   ---Create.vue
   ---Edit.vue
   ---Index.vue
App.vue
Contact.vue
Home.vue
```

## Create.vue
```vue
<template>
  <div class="row">
    <div class="col-12">
      <router-link exact-active-class="active" to="/index" class="nav-link"
        >Bookmarks</router-link
      >
      <div class="card">
        <div class="card-header"><h4>Crear Blog</h4></div>
        <div class="card-body">
          <form @submit.prevent="createBookmark">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="bookmark.title"
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    id="floatingTextarea2"
                    v-model="bookmark.url"
                    style="height: 100px"
                  ></textarea>
                  <label for="floatingTextarea2"></label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-bookmark",
  data() {
    return {
      bookmark: {
        title: "",
        url: "",
      },
    };
  },
  methods: {
    async createBookmark() {
      await this.axios
        .post("/api/bookmark", this.bookmark)
        .then((response) => {
          this.$router.push({ name: "index-bookmark" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
```

## Edit.vue
```vue
<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header"><h4>Editar Bookmark</h4></div>
        <div class="card-body">
          <form @submit.prevent="updateBookmark">
            <div class="row">
              <div class="col-12 mb-2">
                <div class="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="bookmark.title"
                  />
                </div>
              </div>
              <div class="col-12 mb-2">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    id="floatingTextarea2"
                    v-model="bookmark.url"
                    style="height: 100px"
                  ></textarea>
                  <label for="floatingTextarea2"></label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Guardar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-bookmark",
  data() {
    return {
      bookmark: {
        title: "",
        url: "",
      },
    };
  },
  mounted() {
    this.showBookmarks();
  },
  methods: {
    async showBookmarks() {
      await this.axios
        .get(`/api/bookmark/${this.$route.params.id}`)
        .then((response) => {
          const { title, url } = response.data;
          this.bookmark.title = title;
          this.bookmark.url = url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateBookmark() {
      await this.axios
        .put(`/api/bookmark/${this.$route.params.id}`, this.bookmark)
        .then((response) => {
          this.$router.push({ name: "index-bookmark" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
```

## Index.vue
```vue
<template>
  <div class="row">
    <div class="col-12 mb-2">
      <!-- llamamos al componente para Crear   -->
      <router-link :to="{ name: 'create-bookmark' }" class="btn btn-success"
        ><i class="bi bi-plus-circle"></i> Nuevo</router-link
      >
      <router-link to="/create" class="btn btn-success"
        ><i class="bi bi-plus-circle"></i> Nuevo</router-link
      >
    </div>
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Url</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bookmark in bookmarks" :key="bookmark.id">
              <td>{{ bookmark.id }}</td>
              <td>{{ bookmark.title }}</td>
              <td>{{ bookmark.url }}</td>
              <td>
                <!-- llamamos al componente para Editar     -->
                <router-link
                  :to="{ name: 'edit-bookmark', params: { id: bookmark.id } }"
                  class="btn btn-info"
                  >Editar</router-link
                >
                <a
                  type="button"
                  @click="deleteBookmark(bookmark.id)"
                  class="btn btn-danger"
                  >Eliminar</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index-bookmark",
  data() {
    return {
      bookmarks: [],
    };
  },
  mounted() {
    this.showBookmarks();
  },
  methods: {
    async showBookmarks() {
      await this.axios
        .get("/api/bookmark")
        .then((response) => {
          this.bookmarks = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.bookmarks = [];
        });
    },
    deleteBookmark(id) {
      if (confirm("¿Confirma eliminar el registro?")) {
        this.axios
          .delete(`/api/bookmark/${id}`)
          .then((response) => {
            this.showBookmarks();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
```

## App.vue
```vue
<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <!-- llamamos al logo de Vue -->
                    <img src="https://es.vuejs.org/images/logo.png" alt="" width="30" height="24">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link exact-active-class="active" to="/" class="nav-link" aria-current="page">Inicio</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link exact-active-class="active" to="/index" class="nav-link">Bookmarks</router-link>
                    </li>
                     <li class="nav-item">
                        <router-link exact-active-class="active" to="/contact" class="nav-link">Contacto</router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
        <div class="container mt-5">
            <router-view></router-view>
        </div>
    </main>
</template>

<script>
    export default {}
</script>
```

## Contact.vue
```vue
<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col text-center">
               <h1>Componente <span class="badge bg-secondary">CONTACTO</span></h1>
            </div>
        </div>
    </div>
</template>
```

## Home.vue
```vue
<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col text-center">
                <h1>Componente <span class="badge bg-secondary">HOME</span></h1>
            </div>
        </div>
    </div>
</template>
```


