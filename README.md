# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa \_\_detach\_\_

## Mongo URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo \_\_.env.template\_\_ a \_\_.env\_\_

## Llenar la base de datos con información de pruebas

Llamar a:

```
http://localhost:3000/api/seed
```
