# tutorial laravel parte 2

## Requisitos
* NodeJS

## instalar vue@2.6.14 para laravel 8
* procedemos agregar vue@2.6.14 en la parte de "dependencies" en el archivo "package.json".
* Tambien se le puede agregar con "--save" que es opcional.
* Ojo que una dependencia o bien esta en "dependencies" o "devDependencies", no puede estar en los dos lados, asi que si quisieramos agregar o actualizar una dependencia o bien lo cambia de lugar o lo actualiza en donde esta ya sea usando el comando "--save" o "--save-dev" o a secas 
```
npm install vue@2.6.14
npm install vue@2.6.14 --save
```

tiene el mismo efecto si lo agregamos en la parte de "devDependencies" en el archivo "package.json"
```
npm install vue@2.6.14 --save-dev
```

luego ejecutar este comando para cargar correctamente de todos los modulos de node
```
npm install
```

* despues de hacer el comando anterior "npm install", automaticamente se instalara "vue-loader" y "vue-template-compiler" en la paerte de "devDependencies".
* Importante que la version de vue@2.6.14 sea la misma que la version de vue-template-compiler@2.6.14, en este caso estoy utilizando "2.6.14". 
* Asi que si vemos que no es la misma procedemos a intalar la correcta version:
```
npm install vue-template-compiler@2.6.14
```

# procedemos a cambiar otros archivos
* en "resources/js" creamos la carpeta "components" y dentro un componente vue. 
* Tambien agregamos una vista en la carpeta "views"
```
resource
--js
  --components
    --App.vue
--views
  --app.blade.php
```

creamos un contenido temporal de nuestro componente "App.vue"
```html
<template>
    <div>
        <h1>App component</h1>
    </div>
</template>
```

* agreagamos un contenido temporal a nuestra vista "app.blade.php".
* no olvidar agregar los archivos js y css ya compilados, mediante la funcion mix()
```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
```

agregar la ruta get "any" y el retorno de la vista "app" en el archivo "web.php"
```php
Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
```

agregar ".vue()" en "webpack.mix.js"
```js
mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
```

* En "resource/app.js" importamos vue y lo ponemos de manera global.
* Tambien importamos nuestro primer componente "App.vue".
* Creamos la instancia app de Vue, le indicamos el "lugar de renderizacion" señalando el id de la etiqueta html "#app".
* Finalmente montamos el componente App.vue en el "lugar de renderizacion"

```js
import vue from 'vue'
window.Vue = vue;

import App from './components/App.vue';

const app = new Vue({
    el: '#app',
    render: h => h(App),
});
```

una ves corriendo nuestro servidor con el comando "php artisan serve", escribimos cualquier ruta y se debe cargar la vista "app.blade.php" y automaticamente se debe cargar nuestro componente "App.vue"

## Otra manera de montar nuestro primer componente
ojo que si queremos montar otra forma nuestro componente "App.vue" hariamos lo siguiente:
* en "app.js" registramos nuestro componente "App" para q sea global, y quitamos la parte de render de la instancia de vue.
* dentro de "app.blade.php" agregamos el componente "app".

```js
import vue from 'vue'
window.Vue = vue;

Vue.component('App', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
});
```

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
        <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
```

