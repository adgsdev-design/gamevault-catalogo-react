function GameCard({ juego, esFavorito, onToggleFavorito, onSeleccionar }) {
  const manejarFavorito = (evento) => {
    // Evita que el clic en la estrella también abra el detalle
    evento.stopPropagation();
    onToggleFavorito(juego.id);
  };

  return (
    <article className="tarjeta" onClick={() => onSeleccionar(juego)}>
      <div className="tarjeta__imagen">
        <img src={juego.imagen} alt={`Portada de ${juego.nombre}`} />
        <button
          type="button"
          className={`btn-estrella ${esFavorito ? "activo" : ""}`}
          onClick={manejarFavorito}
          aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {esFavorito ? "★" : "☆"}
        </button>
      </div>
      <div className="tarjeta__cuerpo">
        <h3>{juego.nombre}</h3>
        <div className="tarjeta__meta">
          <span className={`etiqueta etiqueta--${juego.genero.toLowerCase()}`}>
            {juego.genero}
          </span>
          <span className="anio">{juego.anio}</span>
        </div>
        <span className="tarjeta__ver">Ver detalle →</span>
      </div>
    </article>
  );
}

export default GameCard;
