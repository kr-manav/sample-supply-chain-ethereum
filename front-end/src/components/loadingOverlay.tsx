const LoadingOverlay = ({
  text = "Please approve the tx and wait till tx is confirmed...",
}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
        <p style={{ fontSize: "30" }}>{text}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
