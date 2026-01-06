# Ejemplos de comandos cURL para la API de Textos

## 1. Crear un nuevo texto (POST)
```bash
curl -X POST http://localhost:3000/api/textos \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Mi primer texto\",\"contenido\":\"Este es el contenido de mi primer texto guardado en la base de datos.\"}"
```

## 2. Obtener todos los textos (GET)
```bash
curl -X GET http://localhost:3000/api/textos
```

## 3. Obtener un texto por ID (GET)
```bash
curl -X GET http://localhost:3000/api/textos/1
```

## 4. Actualizar un texto (PUT)
```bash
curl -X PUT http://localhost:3000/api/textos/1 \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Título actualizado\",\"contenido\":\"Este es el contenido actualizado del texto.\"}"
```

## 5. Eliminar un texto (DELETE)
```bash
curl -X DELETE http://localhost:3000/api/textos/1
```

## 6. Ruta de prueba (GET)
```bash
curl -X GET http://localhost:3000/
```

