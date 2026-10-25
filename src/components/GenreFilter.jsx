function GenreFilter({ generos, seleccionado, onSeleccionar }) {
  const opciones = ["Todos", ...generos];

  return (
    <div className="filtro" role="group" aria-label="Filtrar por género">
      {opciones.map((genero) => (
        <button
          key={genero}
          type="button"
          className={`chip ${seleccionado === genero ? "activo" : ""}`}
          onClick={() => onSeleccionar(genero)}
          aria-pressed={seleccionado === genero}
        >
          {genero}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
