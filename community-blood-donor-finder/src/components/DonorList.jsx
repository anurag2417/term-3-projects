import DonorCard from "./DonorCard";

const DonorList = ({ donors, requestStatuses, onRequest }) => {
  if (donors.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🔍</span>
        <p>No donors found matching your criteria.</p>
        <p className="empty-sub">Try changing the filters above.</p>
      </div>
    );
  }

  return (
    <div className="donor-grid">
      {donors.map((donor) => (
        <DonorCard
          key={donor.id}
          donor={donor}
          requestStatus={requestStatuses.includes(donor.id) ? donor.id : null}
          onRequest={onRequest}
        />
      ))}
    </div>
  );
};

export default DonorList;