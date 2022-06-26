# tutorial laravel

## crear proyecto
instalar laravel installer:
```
composer global require laravel/installer
```

Crear Proyecto con la ultima version de laravel
```
laravel new example-app
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

## ejecutar el proyecto laravel
```
cd example-app

php artisan serve
```

## conectar la base de datos
primero crear la base de datos

.env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_app
DB_USERNAME=root
DB_PASSWORD=Mysql2004
```

## base de datos de ejemplo
tablas
* products
* tags
* brands
* deliveries
* users (adicional)

relaciones:
* products - tags (many to many)
* brands - products (one to many)
* products - deliveries (one to one)
* users (solo para hacer pruebas de sesion y demas)

## creando modelos (migracion, controlador, resources methods, api methods)
m: migracion
c: controlador
r: crea los 7 metodos de un controlador
api: no se crea los metodos create y edit en el controlador
```
php artisan make:model Tag -mcr --api
```

## configurar las migraciones

## configurar los factories

## configurar los modelos
agregar los campos fillable y hidden
```
protected $fillable = [
  'name',
  'description',
];

protected $hidden = [
  'created_at',
  'updated_at',
];
```

agregar las relaciones en el modelos

## controladores
index



