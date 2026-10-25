import GameCard from "./GameCard.jsx";

function GameList({ juegos, favoritos, onToggleFavorito, onSeleccionar, onLimpiarFiltros }) {
  if (juegos.length === 0) {
    return (
      <div className="vacio">
        <p className="vacio__icono">🕹️</p>
        <p>No se encontraron videojuegos con esos criterios.</p>
        <button type="button" className="btn-secundario" onClick={onLimpiarFiltros}>
          Limpiar filtros
        </button>
      </div>
    );
  }

  return (
    <div className="grilla">
      {juegos.map((juego) => (
        <GameCard
          key={juego.id}
          juego={juego}
          esFavorito={favoritos.includes(juego.id)}
          onToggleFavorito={onToggleFavorito}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  );
}

export default GameList;
