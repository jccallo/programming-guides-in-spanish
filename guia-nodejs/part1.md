# Tutorial NodeJS

# Requisitos
* Instalar NodeJS

# Conceptos
* package.json: guarda informacion de proyecto y las dependencias que utiliza, tanto de produccion y de desarrollo.
* package-lock.json: guarda principalmente todas las dependencias que se estan usando, ya sea las que usan las dependencias mismas

# Ejecutar archivo Javascript
```
|-- app.js
```

no hay necesidad de escribir la extension .js
```
node app
```

# Iniciar un proyecto en Node
Para crear un proyecto personalizado
```
npm init
```

Para crear un proyecto con configuracion por default
```
npm init --yes
```
```
npm init -y
```

# Instalar un modulo o libreria de terceros en Node
podriamos instalar la libreria chalk para colorear el texto de la salida
```
npm install chalk
```

