function SearchBar({ valor, onCambiar }) {
  return (
    <div className="buscador">
      <span className="buscador__icono">🔍</span>
      <input
        type="text"
        placeholder="Buscar videojuego por nombre..."
        value={valor}
        onChange={(evento) => onCambiar(evento.target.value)}
        aria-label="Buscar videojuego por nombre"
      />
      {valor && (
        <button
          type="button"
          className="buscador__limpiar"
          onClick={() => onCambiar("")}
          aria-label="Borrar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
