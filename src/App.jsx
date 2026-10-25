import { useState } from "react";
import { videojuegos, GENEROS } from "./data/videojuegos.js";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import GenreFilter from "./components/GenreFilter.jsx";
import GameList from "./components/GameList.jsx";
import GameDetail from "./components/GameDetail.jsx";

function App() {
  // Estado de la aplicación
  const [busqueda, setBusqueda] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [favoritos, setFavoritos] = useState([]); // ids de los juegos favoritos
  const [soloFavoritos, setSoloFavoritos] = useState(false);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Marca o desmarca un juego como favorito
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((favId) => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Búsqueda, filtro por género y favoritos se aplican a la vez con filter()
  const texto = busqueda.trim().toLowerCase();
  const juegosFiltrados = videojuegos.filter((juego) => {
    const coincideNombre = juego.nombre.toLowerCase().includes(texto);
    const coincideGenero = genero === "Todos" || juego.genero === genero;
    const coincideFavorito = !soloFavoritos || favoritos.includes(juego.id);
    return coincideNombre && coincideGenero && coincideFavorito;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setGenero("Todos");
    setSoloFavoritos(false);
  };

  return (
    <div className="app">
      <Header
        totalFavoritos={favoritos.length}
        soloFavoritos={soloFavoritos}
        onToggleSoloFavoritos={() => setSoloFavoritos(!soloFavoritos)}
      />

      <main className="contenido">
        <section className="controles">
          <SearchBar valor={busqueda} onCambiar={setBusqueda} />
          <GenreFilter
            generos={GENEROS}
            seleccionado={genero}
            onSeleccionar={setGenero}
          />
        </section>

        <p className="resumen">
          Mostrando <strong>{juegosFiltrados.length}</strong> de{" "}
          {videojuegos.length} videojuegos
          {soloFavoritos && " · solo favoritos"}
        </p>

        <GameList
          juegos={juegosFiltrados}
          favoritos={favoritos}
          onToggleFavorito={toggleFavorito}
          onSeleccionar={setJuegoSeleccionado}
          onLimpiarFiltros={limpiarFiltros}
        />
      </main>

      {juegoSeleccionado && (
        <GameDetail
          juego={juegoSeleccionado}
          esFavorito={favoritos.includes(juegoSeleccionado.id)}
          onToggleFavorito={toggleFavorito}
          onCerrar={() => setJuegoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default App;
