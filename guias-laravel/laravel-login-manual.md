# tutorial laravel

## Requisitos
* NodeJS
* composer

## Actualizar composer
para evitar advertencias conviene actualizar composer
```
composer selfupdate
```

podemos regresar a la version anterior antes de hacer el update
```
composer self-update --rollback
```

mas informacion: [Actualizar composer](https://stackoverflow.com/questions/64597051/how-to-downgrade-or-install-a-specific-version-of-composer)

## crear proyecto con el instalador de laravel
instalar laravel installer:
```
composer global require laravel/installer
```

luego ya podemos crear un proyecto con la ultima version de laravel
```
laravel new example-app
```

## Crear un proyecto con composer
por defecto composer crea un proyecto en laravel 8
```
composer create-project laravel/laravel my-project
```

podemos crear un proyecto con una version en especifico, por ejemplo version 8
```
composer create-project laravel/laravel my-project "8.*"
```

o una version aun mas especifica anterior
```
composer create-project laravel/laravel my-project "5.5.*"
```

Lo encontré aqui [Fuente](https://cirelramos.blogspot.com/2016/11/laravel-crear-proyecto-en-version.html)

## ejecutar el proyecto laravel
```
cd my-project
php artisan serve
```

si usas laragon simplemente recarga los servicos de apache y mysql "Reload" y ve a la direccion "my-project.test"

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



