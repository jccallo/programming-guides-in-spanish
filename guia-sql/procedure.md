# Procedimientos Almacenados

## Definicion

## Creacion

```sql
CREATE PROCEDURE muestra_productos()
SELECT * FROM productos WHERE proveedor = 'generico';
```

```sql
CREATE PROCEDURE actualiza_productos(nuevo_precio INT, codigo VARCHAR(4))
UPDATE productos SET precio = nuevo_precio WHERE codigo = codigo_producto;
```

## Llamar a un procedimiento

```sql
CALL muestra_productos();
CALL actualiza_productos(20.5, 'AR22');
```

## procedimientos tipo programacion

```sql
DELIMITER $$ -- tambien puede ser //
CREATE PROCEDURE calcula_edad(anio_nacimiento INT)
BEGIN 
	-- declaramos variables
	DECLARE anio_actual INT DEFAULT 2016;
	DECLARE edad INT;

	-- hacemos una operacion
	SET edad = anio_actual - anio_nacimiento;

	-- devuelve edad
	SELECT edad;
END; $$
DELIMITER ;
```

## Triggers y procedimientos

```sql
DELIMITER $$
CREATE TRIGGER revisa_precio_bu 
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
	IF (new.precio < 0) THEN
		SET new.precio = 0;
	ELSEIF (new.precio > 1000) THEN
		SET new.precio = old.precio;
	ELSE IF;
END; $$
DELIMITER ;
```
