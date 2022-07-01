# Tutorial Django

## Requisitos

* Instalar Python 3
* Instalar VSCode

## Creamos nuestro entorno virtual
primero creamos una carpeta con el nombre de nuestro proyecto
```
mkdir tutorial-django
```

creamos el entorno virtual llamado "env" 
```
python -m venv env
```

nos posicionamos dentro de la carpeta "Scripts" y ejecutamos "activate"
```
cd env\Script
activate
```

nuestro entorno virtual ya esta activo y lo comprobamos si vemos entre parentesis el nombre (env)
```
(env) λ 
```

## Actualizamos el pip y setuptools de nuetro entorno virtual
para evitar errores y advertencias como este al intentar ver los paquetes instalados
```
(env) λ pip list
```

```
DEPRECATION: The default format will switch to columns in the future. You can use --format=(legacy|columns) (or define a format=(legacy|columns) in your pip.conf under the [list] section) to disable this warning.
pip (9.0.1)
setuptools (28.8.0)
You are using pip version 9.0.1, however version 22.1.2 is available.
You should consider upgrading via the 'python -m pip install --upgrade pip' command.
```

procedemos a actualizar pip
```
(env) λ pip install --upgrade pip
```

opcional actualizar tambien setuptools
```
(env) λ pip install --upgrade setuptools
```

listamos de nuevo con "pip list"
```
(env) λ pip list
Package    Version
---------- -------
pip        21.3.1
setuptools 59.6.0
```

## Instalamos django en nuestro entorno virtual
```
(env) λ pip install django
```

listamos los paquetes instalados
```
(env) λ pip list
Package           Version
----------------- -------
asgiref           3.4.1
Django            3.2.13
pip               21.3.1
pytz              2022.1
setuptools        59.6.0
sqlparse          0.4.2
typing_extensions 4.1.1
```

vemos que se instaló django y los paquetes que depende para funcionar
