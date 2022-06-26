# Vistas

una vista reemplaza a una consulta

## Creacion

```sql
CREATE VIEW producto_deportes AS
SELECT * FROM productos WHERE categoria = 'deportes'
```

## Modificacion
```sql
ALTER VIEW producto_deportes AS
SELECT codigo, nombre, ciudad, deporte FROM productos WHERE ciudad = 'lima'
```
