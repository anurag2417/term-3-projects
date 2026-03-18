const Header = ({ totalAvailable }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <span className="header-icon"><img src="/logo.png" alt="Logo" style={{
            width: "40px",
            height: "40px",
            objectFit: "contain",
            borderRadius: "8px"
          }} /></span>
          <h1>Community Blood Donor Finder</h1>
        </div>
        <div className="donor-count-badge">
          <span className="count-number">{totalAvailable}</span>
          <span className="count-label">Donors Available</span>
        </div>
      </div>
    </header>
  );
};

export default Header;