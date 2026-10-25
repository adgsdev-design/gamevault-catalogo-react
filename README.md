# 🎮 GameVault — Catálogo de videojuegos con React

Aplicación web hecha con **React** (componentes funcionales + JSX) que permite a los usuarios de una tienda explorar un catálogo de videojuegos, buscarlos por nombre, filtrarlos por género, marcar favoritos y ver el detalle de cada título.

Los datos están en un array de objetos dentro del proyecto (`src/data/videojuegos.js`); no se usa backend ni API.

---

## ✅ Funcionalidades

| Requerimiento | Cómo se cumple |
|---|---|
| Catálogo (mín. 8 juegos) | 12 videojuegos mostrados en tarjetas con nombre, imagen, género y año. |
| Búsqueda | Campo de texto que filtra por nombre **mientras se escribe** (evento `onChange`). |
| Filtro por género | Botones: Todos, Acción, Aventura, Deportes, Estrategia. Funciona **junto con** la búsqueda. |
| Favoritos | Botón ★ en cada tarjeta y en el detalle, contador en el encabezado y botón **"Ver favoritos"**. |
| Detalle | Al hacer clic en una tarjeta se abre un **modal** con descripción, año, plataforma, desarrollador y calificación. |

---

## ▶️ Instrucciones de ejecución

### Requisitos
- [Node.js](https://nodejs.org/) versión 18 o superior (incluye `npm`).

### Pasos
1. Abrir una terminal en la carpeta del proyecto:
   ```bash
   cd catalogo-videojuegos
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador la dirección que aparece en la terminal (normalmente **http://localhost:5173**).

Para generar la versión de producción: `npm run build` (los archivos quedan en `dist/`) y `npm run preview` para probarla.

---

## 📁 Estructura del proyecto

```
catalogo-videojuegos/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── portadas/              # Carátulas de los videojuegos
└── src/
    ├── main.jsx               # Punto de entrada: monta <App /> en el DOM
    ├── App.jsx                # Componente principal: estado y lógica de filtrado
    ├── index.css              # Estilos
    ├── data/
    │   └── videojuegos.js     # Array de objetos con los videojuegos
    └── components/
        ├── Header.jsx         # Título, contador de favoritos y botón "Ver favoritos"
        ├── SearchBar.jsx      # Campo de búsqueda por nombre
        ├── GenreFilter.jsx    # Botones de filtro por género
        ├── GameList.jsx       # Recorre los juegos con map() y pinta las tarjetas
        ├── GameCard.jsx       # Tarjeta individual de un videojuego
        └── GameDetail.jsx     # Modal con el detalle del videojuego
```

---

## 🧠 Explicación: componentes, props, estado y eventos

### 1. Componentes
La interfaz está dividida en **componentes funcionales**, es decir, funciones de JavaScript que devuelven JSX:

```jsx
function GameCard({ juego, esFavorito, onToggleFavorito, onSeleccionar }) {
  return <article className="tarjeta">...</article>;
}
```

- **`App`** es el componente padre: guarda el estado y decide qué se muestra.
- Los demás (`Header`, `SearchBar`, `GenreFilter`, `GameList`, `GameCard`, `GameDetail`) son **componentes hijos** con una sola responsabilidad cada uno, lo que hace el código más fácil de leer y reutilizar.

Árbol de componentes:

```
App
├── Header
├── SearchBar
├── GenreFilter
├── GameList
│   └── GameCard (una por cada juego)
└── GameDetail (solo si hay un juego seleccionado)
```

### 2. Estado (`useState`)
Todo el estado vive en `App.jsx` y se maneja con el hook `useState`:

| Estado | Valor inicial | Para qué sirve |
|---|---|---|
| `busqueda` | `""` | Texto escrito en el buscador. |
| `genero` | `"Todos"` | Género seleccionado en el filtro. |
| `favoritos` | `[]` | Array con los `id` de los juegos favoritos. |
| `soloFavoritos` | `false` | Si se deben mostrar solo los favoritos. |
| `juegoSeleccionado` | `null` | Juego cuyo detalle se muestra en el modal. |

```jsx
const [busqueda, setBusqueda] = useState("");
const [favoritos, setFavoritos] = useState([]);
```

Cada vez que se llama a una función `set...`, React vuelve a renderizar el componente con el valor nuevo, y la lista de juegos se recalcula automáticamente.

**Búsqueda y filtro al mismo tiempo con `filter()`**: la lista que se muestra se *deriva* del estado; un juego aparece solo si cumple las tres condiciones a la vez:

```jsx
const juegosFiltrados = videojuegos.filter((juego) => {
  const coincideNombre = juego.nombre.toLowerCase().includes(texto);
  const coincideGenero = genero === "Todos" || juego.genero === genero;
  const coincideFavorito = !soloFavoritos || favoritos.includes(juego.id);
  return coincideNombre && coincideGenero && coincideFavorito;
});
```

**Marcar/desmarcar favoritos** sin modificar el array original (inmutabilidad):

```jsx
const toggleFavorito = (id) => {
  if (favoritos.includes(id)) {
    setFavoritos(favoritos.filter((favId) => favId !== id)); // quitar
  } else {
    setFavoritos([...favoritos, id]);                         // agregar
  }
};
```

### 3. Props
Las **props** son los datos y funciones que un componente padre le pasa a un hijo. La comunicación funciona en dos direcciones:

- **De padre a hijo (datos):** `App` le pasa a `GameList` la lista filtrada y los favoritos; `GameList` le pasa a cada `GameCard` su `juego` y si `esFavorito`.
- **De hijo a padre (funciones callback):** los hijos no modifican el estado directamente; reciben funciones como `onToggleFavorito`, `onSeleccionar` u `onCambiar` y las llaman cuando ocurre algo. Así el estado sigue centralizado en `App`.

```jsx
// En App.jsx
<GameList
  juegos={juegosFiltrados}
  favoritos={favoritos}
  onToggleFavorito={toggleFavorito}
  onSeleccionar={setJuegoSeleccionado}
/>

// En GameList.jsx: map() crea una tarjeta por juego
{juegos.map((juego) => (
  <GameCard
    key={juego.id}
    juego={juego}
    esFavorito={favoritos.includes(juego.id)}
    onToggleFavorito={onToggleFavorito}
    onSeleccionar={onSeleccionar}
  />
))}
```

La prop `key` le permite a React identificar cada tarjeta de forma única al actualizar la lista.

### 4. Eventos (`onClick` y `onChange`)

| Evento | Componente | Qué hace |
|---|---|---|
| `onChange` | `SearchBar` | Cada tecla actualiza `busqueda` → la lista se filtra mientras se escribe. |
| `onClick` | `GenreFilter` | Cambia el género seleccionado. |
| `onClick` | `GameCard` (estrella) | Marca/desmarca favorito. Usa `stopPropagation()` para no abrir también el detalle. |
| `onClick` | `GameCard` (tarjeta) | Guarda el juego en `juegoSeleccionado` y abre el modal. |
| `onClick` | `Header` | Alterna entre ver todos y ver solo favoritos. |
| `onClick` | `GameDetail` | Cierra el modal (botón ✕ o clic en el fondo) y marca favorito. |

```jsx
<input
  value={valor}
  onChange={(evento) => onCambiar(evento.target.value)}
/>
```

El input es un **componente controlado**: su valor viene del estado (`value={valor}`) y cada cambio actualiza ese estado.

### 5. JSX y renderizado condicional
Además de `map()`, se usa renderizado condicional para mostrar elementos solo cuando corresponde:

```jsx
{juegoSeleccionado && <GameDetail juego={juegoSeleccionado} ... />}
```

Si no hay resultados, `GameList` muestra un mensaje con un botón para limpiar los filtros.

---

## 🎬 Guion sugerido para el video de demostración (1–2 min)

1. Mostrar el catálogo completo (12 tarjetas con imagen, nombre, género y año).
2. **Búsqueda:** escribir "sp" lentamente y mostrar que los resultados cambian con cada letra; borrar con la ✕.
3. **Filtro:** pulsar "Deportes", luego "Estrategia".
4. **Búsqueda + filtro:** con "Acción" seleccionado escribir "god" → solo queda God of War. Escribir algo que no exista para mostrar el mensaje de "sin resultados" y usar "Limpiar filtros".
5. **Favoritos:** marcar 3 juegos con la ★ y mostrar cómo sube el contador; desmarcar uno.
6. Pulsar **"Ver favoritos"** para ver solo esos juegos (y combinarlo con un género).
7. **Detalle:** hacer clic en una tarjeta, mostrar descripción y datos, marcar favorito desde el modal y cerrarlo.

Para grabar en Windows se puede usar la **Barra de juego (Win + G)** o la **Herramienta Recortes (Win + Shift + R)**.

---

## 🛠️ Tecnologías
- React 18 (componentes funcionales, JSX, `useState`)
- Vite 5 (servidor de desarrollo y empaquetado)
- CSS puro

## 🖼️ Créditos de las imágenes
Las carátulas de los videojuegos se obtuvieron de Wikipedia y pertenecen a sus respectivos desarrolladores y distribuidores. Se usan únicamente con fines educativos.
