function GameDetail({ juego, esFavorito, onToggleFavorito, onCerrar }) {
  return (
    // Al hacer clic en el fondo oscuro se cierra el modal
    <div className="modal__fondo" onClick={onCerrar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-detalle"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="modal__cerrar" onClick={onCerrar} aria-label="Cerrar">
          ✕
        </button>

        <img className="modal__imagen" src={juego.imagen} alt={`Portada de ${juego.nombre}`} />

        <div className="modal__cuerpo">
          <span className={`etiqueta etiqueta--${juego.genero.toLowerCase()}`}>
            {juego.genero}
          </span>
          <h2 id="titulo-detalle">{juego.nombre}</h2>
          <p className="modal__descripcion">{juego.descripcion}</p>

          <dl className="modal__datos">
            <div>
              <dt>Año</dt>
              <dd>{juego.anio}</dd>
            </div>
            <div>
              <dt>Plataforma</dt>
              <dd>{juego.plataforma}</dd>
            </div>
            <div>
              <dt>Desarrollador</dt>
              <dd>{juego.desarrollador}</dd>
            </div>
            <div>
              <dt>Calificación</dt>
              <dd>⭐ {juego.calificacion} / 10</dd>
            </div>
          </dl>

          <button
            type="button"
            className={`btn-primario ${esFavorito ? "activo" : ""}`}
            onClick={() => onToggleFavorito(juego.id)}
          >
            {esFavorito ? "★ Quitar de favoritos" : "☆ Agregar a favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
