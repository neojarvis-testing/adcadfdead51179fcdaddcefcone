import React from 'react';

const Headers = () => {
  const handleRefreshClick = () => {
    window.location.reload();
  };
  return (
    <header className='header'>
      <h1>My Keep Notes</h1>
      <button className="refresh-button" onClick={handleRefreshClick}>
        Refresh
      </button>
    </header>
  );
};

export default Headers;
