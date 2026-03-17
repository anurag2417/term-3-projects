const DonorCard = ({ donor, requestStatus, onRequest }) => {
  const isRequested = requestStatus === donor.id;
  const requested = isRequested;

  return (
    <div className={`donor-card ${!donor.available ? "unavailable" : ""}`}>
      <div className="card-top">
        <div className="donor-avatar">
          {donor.name.charAt(0).toUpperCase()}
        </div>
        <div className="donor-info">
          <h3 className="donor-name">{donor.name}</h3>
          <p className="donor-email">{donor.email}</p>
        </div>
        <div className="blood-group-badge">{donor.bloodGroup}</div>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span>{donor.city}</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📞</span>
          <span>{donor.phone}</span>
        </div>
        <div className="detail-item">
          <span
            className={`availability-badge ${
              donor.available ? "available" : "not-available"
            }`}
          >
            {donor.available ? "✅ Available" : "❌ Unavailable"}
          </span>
        </div>
      </div>

      <button
        className={`request-btn ${requested ? "requested" : ""}`}
        onClick={() => onRequest(donor.id)}
        disabled={requested || !donor.available}
      >
        {requested ? "Request Sent ✅" : "Request Help"}
      </button>
    </div>
  );
};

export default DonorCard;