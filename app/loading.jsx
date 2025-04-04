"use client"

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 9999;
        }
        
        .loader {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #ff00ff; /* Pink */
          animation: spin 1s linear infinite;
          position: relative;
        }
        
        .loader:before, .loader:after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 3px solid transparent;
        }
        
        .loader:before {
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-top-color: #9900ff; /* Purple */
          animation: spin 1.5s linear infinite;
        }
        
        .loader:after {
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 6px;
          border-top-color: #ff66ff; /* Light Pink */
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
            background: linear-gradient(45deg, rgba(255,0,255,0) 0%, rgba(153,0,255,0) 100%);
          }
          100% {
            transform: rotate(360deg);
            background: linear-gradient(45deg, rgba(255,0,255,0.1) 0%, rgba(153,0,255,0.1) 100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader ;