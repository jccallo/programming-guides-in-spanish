# triggers

## Definicion

* Es un disparador que ejecuta ciertas acciones (procedimiento) cuando alguien inserte, actialize o elimine (evento).
* el disparador puede ejecutarse ya sea antes o despues del evento, segun sea el caso (tiempo).

## Convencion

* i -> insert
* u -> update
* d -> delete

* b -> before
* a -> after

## Cuando se inserta

```sql
CREATE TRIGGER productos_ai 
AFTER INSERT ON productos
FOR EACH ROW -- un registro
-- FOR EACH STATEMENT -- una sentencia
INSERT INTO productos_insertados (codigo, nombre, precio, fecha_insercion)
VALUES (new.codigo, new.nombre, new.precio, now())
```

creamos un trigger llamado ***productos_ai*** que se ejecutara despues que se inserte un registro en la tabla ***productos***. El trigger insertará un registro en la tabla llamada ***productos_respaldo*** con los nuevos valores insertados

```sql
INSERT INTO productos (codigo, nombre, precio, proveedor) 
VALUES ('AR75', 'pantalon', 50, 'generico')
```

cuando insertamos un registro en la tabla ***productos***, se insterta un registro automaticamente definido en el trigger

## Cuando se actualiza

```sql
CREATE TRIGGER productos_bu 
BEFORE UPDATE ON productos
FOR EACH ROW -- un registro
-- FOR EACH STATEMENT -- una sentencia
INSERT INTO productos_actualizados (codigo, nombre, precio_anterior, precio_nuevo, fecha_actualizacion)
VALUES (old.codigo, old.nombre, old.precio, new.precio, now())
```

vemos que se guarda el mismo codigo y nombre del producto, ya que no se cambió, pero tambien se guarda el precio anterior y el nuevo precio del articulo

## Cuando se elimina

```sql
CREATE TRIGGER productos_ad
AFTER DELETE ON productos
FOR EACH ROW -- un registro
-- FOR EACH STATEMENT -- una sentencia
INSERT INTO productos_eliminados (codigo, nombre, precio, fecha_eliminacion)
VALUES (old.codigo, old.nombre, old.precio, now())
```

guardamos el registro que se eliminó de la tabla ***productos*** en esta tabla llamada ***productos_eliminados*** 

## Eliminar un trigger

agrefamos ***IF EXISTS*** para decirle que lo elimine si es que existe la tabla y no me arroje error si no lo encuentra 
```sql
DROP TRIGGER IF EXISTS productos_ad;
```

## Modificar un trigger

No existe una manera de hacer esto. Solo nos queda eliminar y crear de nuevo el trigger

```sql
DROP TRIGGER IF EXISTS productos_ad;

CREATE TRIGGER productos_ad
AFTER DELETE ON productos
FOR EACH ROW -- un registro
-- FOR EACH STATEMENT -- una sentencia
INSERT INTO productos_eliminados (codigo, nombre, precio, fecha_eliminacion)
VALUES (old.codigo, old.nombre, old.precio, now())
```
