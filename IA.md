# Uso de IA en el proyecto

## Herramienta
Claude (Anthropic), en el chat web.

## Prompts principales
- Pedi orientacion para empezar el proyecto Ionic + Angular 21 (pasos, estructura, buenas practicas).
- Pedi ayuda con errores de Git (carpeta clima-ionic que daba 404 en GitHub).
- Pedi el codigo base del servicio de clima y de las pestanas Hoy y Pronostico, con explicacion linea por linea.
- Pegue mensajes de error para que me ayude a entenderlos.
- Pedi orientacion para la pestaña Ciudades usando un archivo JSON local (ciudades.json) en lugar de una API.
- Pegue mi codigo de `ciudad.service.ts` y de `tab3` para que me señale errores.

## Codigo que genero la IA
- Codigo base de `clima.service.ts`.
- Codigo base de `tab1.page.ts/html` y `tab2.page.ts/html`.
- Explicaciones de que hace cada parte
- Estructura sugerida para `ciudades.json` (formato nombre/latitud/longitud).
- Version corregida de `ciudad.service.ts` (orden del decorador y la interfaz).
- Version corregida de `tab3.page.ts` y `tab3.page.html`, que seguia el patron de la pestaña Pronostico.

## Que hice yo
- Cree el proyecto, el repositorio y los commits.
- Cambie los nombres de los tabs 1, 2 y 3
- Corregi errores de tipeo en la URL de Open-Meteo (`https//:` en vez de `https://`) leyendo el error de la consola
- Corregi imports (`@ionic/anglar) y el nombre de los archivos
- Reemplace el HTML original de la plantilla
- Defini la idea de la app: Asuncion y las ciudades de Central
- Arme `ciudades.json` con 20 ciudades de Central y sus coordenadas, que busque yo en Google Maps.
- Escribi mi primera versión de `ciudad.service.ts` y de `tab3`, copiando y adaptando el patrón de las otras pestañas
- Encontre y corregi errores de tipeo (comas en lugar de punto y coma) que impedian mostrar la lista, leyendo el error de la terminal
- Defini la idea de la pestaña: elegir entre las ciudades de Central