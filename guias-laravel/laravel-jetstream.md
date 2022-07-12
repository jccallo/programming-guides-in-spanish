# Tutorial Laravel Jetstream

## Crear proyecto junto con jetstream
en su documentacion oficial quitaron esta forma. Averiguar si funciona aun o no
```
laravel new myproject --jet
```

## Instalar Jetstream en un proyecto ya creado de laravel
* Vamos a escoger el stack Laravel-Livewire
* Debemos configurar la conexion a la base de datos en el archivo .env

Paso 1:
```
composer require laravel/jetstream
```

Paso 2: Elejir solo uno: sin equipos o con equipos (esto se puede cambiar mas adelante)
```
php artisan jetstream:install livewire
php artisan jetstream:install livewire --teams
```

Paso 3:
```
npm install
npm run dev
php artisan migrate
```

## Levantar proyecto
```
cd myproject
php artisan serve
```

Ojo que ahora laravel utiliza Vite en lugar de laravel-mix, asi que "npm run dev" tiene que estar ejecutandose para que los assets estes disponibles 
```
composer require laravel/jetstream
```
