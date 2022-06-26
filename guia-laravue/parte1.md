
Lo encontré aqui [Fuente](https://cirelramos.blogspot.com/2016/11/laravel-crear-proyecto-en-version.html)


## AppServiceProvider.php
```php
use Illuminate\Support\Facades\Schema;

public function boot()
{
    Schema::defaultStringLength(191);
}
```

## .env
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravue
DB_USERNAME=root
DB_PASSWORD=
```

## Instalamos Vue y demas
```
npm install vue
```

pero si quieres crear un scaffolding con vue
```
composer require laravel/ui
php artisan ui vue
```

luego instalar estos 2 paquetes
```
npm install vue-router
```

```
npm install vue-axios
```

o si lo instalamos en una sola linea
```
npm i vue vue-router vue-axios
```

## instalamos las dependencias
```
npm install
```

## Compilamos y escuchamos

para compilar 1 vez
```
npm run dev
```

para compilar y escuchar
```
npm run watch
```

si da error el comando anterior dev o watch. Pero tambien se puede ejecutar antes para asegurar
```
npm update vue-loader
```

## Creamos el modelo
```
php artisan make:model Blog
```

agregamos la propiedad fillable
```php
class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'contenido',
    ];
}
```

## Creamos la migracion
```
php artisan make:migration create_blogs_table
```

agregamos 2 campos para crear la tabla blogs
```php
public function up()
{
    Schema::create('blogs', function (Blueprint $table) {
        $table->id();
        $table->string('titulo');
        $table->text('contenido');
        $table->timestamps();
    });
}
```


## Ejecutamos las migraciones
```
php artisan migrate
```

## Creamos el controller de Blogs
```
php artisan make:controller BlogController --resource
```

## Crear modelo migracion y conrolador a la vez
ceamos el modelo ademas la migracion, controlador resource

```
php artisan make:model Blog -mcr
```

## Rellenamos BlogController
```php
class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $blogs = Blog::all();
        return response()->json($blogs);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $blog = Blog::create($request->post());
        return response()->json([
            'blog'=> $blog
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        return response()->json($blog);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        $blog->fill($request->post())->save();
        return response()->json([
            'blog'=> $blog
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return response()->json([
            'mensaje'=> 'Blog eliminado'
        ]);
    }
}
```

## Agregamos las rutas

web.php
```php
Route::get('{any}', function() {
    return view('app');
});
```

api.php
```php
Route::resource('blog', BlogController::class)->only(['index', 'store', 'update', 'show', 'destroy']);
```

en resources/views creamos app.js
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel + Vue</title>

    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    
    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet">
</head>
<body>
    <div id="app">
    </div>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
```





