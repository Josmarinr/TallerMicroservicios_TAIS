# Documentación Técnica

## Arquitectura

```
Cliente
  │
  ▼
API Gateway (3000)
  ├── → users-service  (3001)
  ├── → products-service (3002)
  └── → orders-service (3003)
         └── → users-service (valida userId)
```

El cliente nunca habla directamente con los servicios. Todo pasa por el gateway.

---

## Descripción por servicio

### api-gateway
- Recibe todos los requests HTTP del cliente.
- Redirige cada ruta al servicio correspondiente usando `HttpService` de NestJS.
- Las URLs internas se configuran por variable de entorno (`USERS_URL`, `PRODUCTS_URL`, `ORDERS_URL`).

### users-service
- Guarda usuarios en un array en memoria.
- Cada usuario tiene: `id`, `name`, `email`.
- Los IDs son numéricos autoincrementales.

### products-service
- Tiene 5 productos precargados en memoria.
- Solo expone `GET /products`. No permite crear ni eliminar productos desde la API.

### orders-service
- Antes de crear un pedido, hace una llamada HTTP a `users-service` para verificar que el `userId` existe.
- Si el usuario no existe, retorna `404`.
- Cada pedido tiene: `id`, `userId`, `products` (array de ids), `createdAt`.

---

## Variables de entorno

| Variable      | Servicio que la usa          | Valor por defecto         |
|---------------|------------------------------|---------------------------|
| USERS_URL     | api-gateway, orders-service  | http://localhost:3001     |
| PRODUCTS_URL  | api-gateway                  | http://localhost:3002     |
| ORDERS_URL    | api-gateway                  | http://localhost:3003     |

---

## Estructura de archivos

```
ecommerce/
├── api-gateway/
│   └── src/
│       ├── main.ts           → Levanta la app en el puerto 3000
│       ├── app.module.ts     → Registra HttpModule y el controller
│       └── app.controller.ts → Redirige cada ruta al servicio correcto
│
├── users-service/
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── app.controller.ts → POST /users, GET /users/:id
│       └── app.service.ts    → Lógica + almacenamiento en memoria
│
├── products-service/
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── app.controller.ts → GET /products
│       └── app.service.ts    → Retorna lista fija de productos
│
├── orders-service/
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── app.controller.ts → POST /orders, GET /orders/:id, DELETE /orders/:id
│       └── app.service.ts    → Valida userId, crea y elimina pedidos
│
├── docker-compose.yml        → Levanta todo con un solo comando
└── README.md
```

---

## Errores comunes

| Situación                          | Respuesta esperada         |
|------------------------------------|----------------------------|
| POST /orders con userId inexistente| 404 - Usuario no existe    |
| GET /users/:id con id inválido     | 404 - User not found       |
| POST /orders sin products          | 400 - userId y products son requeridos |
