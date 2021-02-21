import React from 'react';
import './Overview.less';
import { Placeholder } from 'rsuite';
import Button from '../../../components/Button/Button';
import blackThumbnail from '../../../assets/images/black-thumbnail.png';

const mockTranscriptInfo = {
  videoTitle: 'CSS Outline vs. Border',
  keypoints: [
    {
      title: 'Keypoint 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
    {
      title: 'Keypoint 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
    {
      title: 'Keypoint 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
    {
      title: 'Keypoint 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
    {
      title: 'Keypoint 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
    {
      title: 'Keypoint 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum arcu mi, aliquet adipiscing id. Leo et dui habitasse erat suspendisse placerat quisque vitae diam. Sapien posuere facilisi mattis ut enim vitae lectus parturient nulla. Morbi felis molestie eget arcu.',
    },
  ],
};

const { Paragraph } = Placeholder;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function Overview(props) {
  const { sections, originalVideoLink, keypoints, onKeypointClick, videoTitle } = props;

  const handleKeypointClick = (e, time) => {
    e.preventDefault();
    onKeypointClick(time);
  };

  return (
    <div className="Overview__info">
      <div className="Overview__info-transcript">
        {sections && originalVideoLink ? (
          <>
            <div className="Overview__info-transcript-header">
              <h2 className="Overview__info-transcript-title">{videoTitle}</h2>
              <Button appearance="ghost">
                <a href={originalVideoLink} target="_blank" rel="noreferrer" className="Overview__info-original">Original Video</a>
              </Button>
            </div>
            {sections.map(section => (
              <div className="Overview__info-transcript-keypoint">
                <h3 className="Overview__info-transcript-keypoint-title">{section.keySentence}</h3>
                <p className="Overview__info-transcript-keypoint-description">{section.sentences}</p>
              </div>
            ))}
          </>
        ) : (
          <Paragraph rows={10} style={{ marginTop: 32, marginBottom: 24 }} />
        )}
      </div>
      <div className="Overview__info-keypoints">
        <h3 className="Overview__info-keypoints-title">Keypoints</h3>
        {keypoints ? (
          <>
            {keypoints.map(([title, time,, imageThumbnailUrl], index) => (
              <div className="Overview__info-keypoint" onClick={e => handleKeypointClick(e, time)}>
                <img src={imageThumbnailUrl} className="Overview__info-keypoint-thumbnail" alt=""/>
                <div className="Overview__info-keypoint-metadata">
                  <p className="Overview__info-keypoint-metadata-title">{index + 1}. {title}</p>
                  <div className="Overview__info-keypoint-badge">
                    {formatTime(time)}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Paragraph rows={8} style={{ marginBottom: 20 }} />
        )}
      </div>
    </div>
  );
}

export default Overview;
