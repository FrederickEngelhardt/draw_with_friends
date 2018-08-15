import React from 'react';
import { Link } from "react-router-dom";

const RecentSessionCard = () => {
  return (
    <div className={`clickAnimation DrawingPageCard`}>
      <button className={`shadow Button blue`}>
        <h1 className={`buttonTitle`}> Recent Session </h1>
      </button>
    </div>
  )
}

export default RecentSessionCard
