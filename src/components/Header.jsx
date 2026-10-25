function Header({ totalFavoritos, soloFavoritos, onToggleSoloFavoritos }) {
  return (
    <header className="header">
      <div className="header__marca">
        <span className="header__logo">🎮</span>
        <div>
          <h1>GameVault</h1>
          <p>Explora, busca y guarda tus videojuegos favoritos</p>
        </div>
      </div>

      <button
        type="button"
        className={`btn-favoritos ${soloFavoritos ? "activo" : ""}`}
        onClick={onToggleSoloFavoritos}
        aria-pressed={soloFavoritos}
      >
        <span>{soloFavoritos ? "★ Ver todos" : "★ Ver favoritos"}</span>
        <span className="contador">{totalFavoritos}</span>
      </button>
    </header>
  );
}

export default Header;
