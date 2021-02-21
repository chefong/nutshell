import React from 'react';
import './Details.less';
import infoIcon from '../../../assets/images/info.svg';
import { Placeholder } from 'rsuite';
import Graph from './Graph';

const { Paragraph } = Placeholder;

function convertToMinutesAndSeconds(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  return { minutes, seconds };
}

function Details(props) {
  const { readTime, durationTime, readTimePercentDiff, durationTimePercentDiff, readingLevels, readingLevelsXLabels } = props;
  const { minutes: readMinutes, seconds: readSeconds } = convertToMinutesAndSeconds(readTime);
  const { minutes: durationMinutes, seconds: durationSeconds } = convertToMinutesAndSeconds(durationTime); 

  return (
    <div className="Details">
      <div className="Details__graph">
        <div className="Details__graph-header">
          <h3 className="Details__graph-title">Reading Level Over Time</h3>
          <img src={infoIcon} alt=""/>
        </div>
        {readingLevels && readingLevels.length > 0 ? (
          <Graph readingLevels={readingLevels} xLabels={readingLevelsXLabels} />
        ) : (
          <Paragraph rows={8} style={{ marginBottom: 24 }} />
        )}
      </div>
      <div className="Details__stats">
        <div className="Details__stats-video-duration">
          <div className="Details__stats-header">
            <h3 className="Details__stats-title">Video Duration</h3>
            <img src={infoIcon} alt=""/>
          </div>
          {durationTime ? (
            <div className="Details__stats-info">
              <p><span className="Details__time">{durationMinutes}</span> minutes &nbsp;<span className="Details__time">{durationSeconds}</span> seconds</p>
              <div className="Details__stats-badge">{Math.round(durationTimePercentDiff)}%</div>
            </div>
          ) : (
            <Paragraph rows={1} />
          )}
        </div>
        <div className="Details__stats-read-time">
          <div className="Details__stats-header">
            <h3 className="Details__stats-title">Transcript Read Time</h3>
            <img src={infoIcon} alt=""/>
          </div>
          {readTime ? (
            <div className="Details__stats-info">
              <p><span className="Details__time">{readMinutes}</span> minutes &nbsp;<span className="Details__time">{readSeconds}</span> seconds</p>
              <div className="Details__stats-badge">{Math.round(readTimePercentDiff)}%</div>
            </div>
          ) : (
            <Paragraph rows={1} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
