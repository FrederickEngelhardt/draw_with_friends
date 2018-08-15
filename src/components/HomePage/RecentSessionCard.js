import React from 'react';
import { Link } from "react-router-dom";

const RecentSessionCard = () => {
  return (
    <div className={`clickAnimation DrawingPageCard`}>

        <Link className={`DrawingPageCard`} to="/drawing">
          <button className={`shadow Button blue`}></button>
        </Link>
        <h1 className={`buttonTitle`}> Recent Session </h1>
    </div>
  )
}

export default RecentSessionCard
