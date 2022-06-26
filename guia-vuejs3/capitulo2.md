## Instalaciond de vue-router

via vue y crea una especie de scaffolding de vistas, rutas y componentes (recomendado)
```
vue add router
```

via npm
```
npm install vue-router
```

## instalando vuex

```
npm install vuex@next --save
```

## Creamos los componentes
```
components
--Create.vue
--Edit.vue
--List.vue
```

## Creamos las rutas

```
router
--index.js
```

***router/index.js*** importamos componentes y agregamos las rutas
```js
import Create from '../components/Create.vue'
import Edit from '../components/Edit.vue'
import List from '../components/List.vue'

const routes = [
	{
	 path: '/create',
	 name: 'Create',
	 component: Create
	},
	{
	 path: '/edit',
	 name: 'Edit',
	 component: Edit
	},
	{
	 path: '/list',
	 name: 'List',
	 component: List
	},
] 
```


