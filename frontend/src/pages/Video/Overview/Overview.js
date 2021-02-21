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

const mockKeypointsInfo = [
  {
    title: 'Adding outlines won’t influence the layout. asd a jo oaj fo joiaj a  fopdsaijfsaojf ',
    timestamp: '0:45',
  },
  {
    title: 'Adding outlines won’t influence the layout.',
    timestamp: '0:45',
  },
  {
    title: 'Adding outlines won’t influence the layout.',
    timestamp: '0:45',
  },
  {
    title: 'Adding outlines won’t influence the layout.',
    timestamp: '0:45',
  },
  {
    title: 'Adding outlines won’t influence the layout.',
    timestamp: '0:45',
  },
  {
    title: 'Adding outlines won’t influence the layout.',
    timestamp: '0:45',
  },
];

const { Paragraph } = Placeholder;

function Overview(props) {
  const { transcriptInfo, keypoints } = props;

  return (
    <div className="Overview__info">
      <div className="Overview__info-transcript">
        {transcriptInfo ? (
          <>
            <div className="Overview__info-transcript-header">
              <h2 className="Overview__info-transcript-title">{mockTranscriptInfo.videoTitle}</h2>
              <Button appearance="ghost">Original Video</Button>
            </div>
            {mockTranscriptInfo.keypoints.map(keypoint => (
              <div className="Overview__info-transcript-keypoint">
                <h3 className="Overview__info-transcript-keypoint-title">{keypoint.title}</h3>
                <p className="Overview__info-transcript-keypoint-description">{keypoint.description}</p>
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
            {mockKeypointsInfo.map((keypoint, index) => (
              <div className="Overview__info-keypoint">
                <img src={blackThumbnail} alt=""/>
                <div className="Overview__info-keypoint-metadata">
                  <p className="Overview__info-keypoint-metadata-title">{index + 1}. {keypoint.title}</p>
                  <div className="Overview__info-keypoint-badge">
                    {keypoint.timestamp}
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
