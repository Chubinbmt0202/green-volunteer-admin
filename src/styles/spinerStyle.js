let isSpiner = false

const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)", 
    display: isSpiner ? "block" : "none",
    zIndex: 9999,
  };

  const spinnerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999, 

  };

  module.exports = {overlayStyles, spinnerStyles, isSpiner}
  