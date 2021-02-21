import React from 'react';
import './Details.less';
import infoIcon from '../../../assets/images/info.svg';

function Details(props) {
  return (
    <div className="Details">
      <div className="Details__graph">

      </div>
      <div className="Details__stats">
        <div className="Details__stats-video-duration">
          <div className="Details__stats-header">
            <h3 className="Details__stats-title">Video Duration</h3>
            <img src={infoIcon} alt=""/>
          </div>
          <div className="Details__stats-info">
            <p><span className="Details__time">5</span> minutes &nbsp;<span className="Details__time">35</span> seconds</p>
            <div className="Details__stats-badge">-50%</div>
          </div>
        </div>
        <div className="Details__stats-read-time">
          <div className="Details__stats-header">
            <h3 className="Details__stats-title">Transcript Read Time</h3>
            <img src={infoIcon} alt=""/>
          </div>
          <div className="Details__stats-info">
            <p><spand className="Details__time">5</spand> minutes &nbsp;<span className="Details__time">35</span> seconds</p>
            <div className="Details__stats-badge">-50%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
