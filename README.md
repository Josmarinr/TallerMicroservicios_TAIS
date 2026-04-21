# eCommerce - Arquitectura de Microservicios con NestJS

Tres servicios independientes comunicados a través de un API Gateway central.

## Servicios y puertos

| Servicio         | Puerto | Descripción                          |
|------------------|--------|--------------------------------------|
| api-gateway      | 3000   | Punto de entrada único               |
| users-service    | 3001   | Registrar y consultar usuarios       |
| products-service | 3002   | Listar productos disponibles         |
| orders-service   | 3003   | Crear, consultar y eliminar pedidos  |

---

## Despliegue con Docker (recomendado)

Requiere tener Docker y Docker Compose instalados.

```bash
docker-compose up --build
```

Esto levanta los 4 servicios en paralelo. Todos los requests van por el puerto **3000**.

---

## Despliegue manual (sin Docker)

Abrir una terminal por cada servicio y ejecutar:

```bash
# Terminal 1
cd users-service && npm install && npm run build && npm start

# Terminal 2
cd products-service && npm install && npm run build && npm start

# Terminal 3
cd orders-service && npm install && npm run build && npm start

# Terminal 4
cd api-gateway && npm install && npm run build && npm start
```

---

## Endpoints disponibles

Todos los requests van al **API Gateway en el puerto 3000**.

### Usuarios

```
POST   /users          → Crear usuario
GET    /users/:id      → Obtener usuario por id
```

**Body para crear usuario:**
```json
{ "name": "Juan", "email": "juan@mail.com" }
```

### Productos

```
GET    /products       → Listar todos los productos
```

### Pedidos

```
POST   /orders         → Crear pedido
GET    /orders/:id     → Ver pedido por id
DELETE /orders/:id     → Eliminar pedido
```

**Body para crear pedido:**
```json
{ "userId": 1, "products": [1, 3] }
```

> El servicio de pedidos valida que el `userId` exista antes de crear el pedido.

---

## Notas

- El almacenamiento es en memoria, los datos se pierden al reiniciar.
- Los servicios se comunican entre sí internamente; el cliente solo habla con el gateway.
- Para usar base de datos real (MongoDB, PostgreSQL, etc.) se reemplaza el array en memoria del `.service.ts` correspondiente.
