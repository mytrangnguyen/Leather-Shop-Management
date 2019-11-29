import React from "react";

const IsLoading = () => {
  return (
    <main className="app-content">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </main>
  );
};

export default IsLoading;
