import React, { useState } from 'react';
import './Video.less';
import { Player, BigPlayButton } from 'video-react';
import Button from '../../components/Button/Button';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/images/x.svg';
import blackThumbnail from '../../assets/images/black-thumbnail.png';
import { Modal } from 'rsuite';

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

function Video() {
  const [showBanner, setShowBanner] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleBannerClose = (e) => {
    e.preventDefault();
    setShowBanner(false);
  };

  const handleLearnClick = (e) => {
    e.preventDefault();
    setShowInfoModal(true);
  };

  const handleModalClose = () => {
    setShowInfoModal(false);
  };

  const renderInfoBanner = () => {
    return (
      <div className="Video__banner">
        <p className="Video__banner-text">Wow! That was fast, wasn’t it?  <span className="Video__banner-link" onClick={handleLearnClick}>Click here to find out why</span></p>
        <img src={closeIcon} className="Video__banner-close" onClick={handleBannerClose} alt=""/>
      </div>
    );
  };

  return (
    <div className="Video">
      <div className="Video__navbar">
        <img src={logo} alt=""/>
        <Link to="/" className="Video__navbar-back"><Button appearance="primary">Start Again</Button></Link>
      </div>
      {showBanner && renderInfoBanner()}
      <div className="Video__player">
        <Player src='http://media.w3.org/2010/05/bunny/movie.mp4' fluid={false} height={500} width="100%">
          <BigPlayButton position="center" />
        </Player>
      </div>
      <div className="Video__info">
        <div className="Video__info-transcript">
          <div className="Video__info-transcript-header">
            <h2 className="Video__info-transcript-title">{mockTranscriptInfo.videoTitle}</h2>
            <Button appearance="ghost">Original Video</Button>
          </div>
          {mockTranscriptInfo.keypoints.map(keypoint => (
            <div className="Video__info-transcript-keypoint">
              <h3 className="Video__info-transcript-keypoint-title">{keypoint.title}</h3>
              <p className="Video__info-transcript-keypoint-description">{keypoint.description}</p>
            </div>
          ))}
        </div>
        <div className="Video__info-keypoints">
          <h3 className="Video__info-keypoints-title">Keypoints</h3>
          {mockKeypointsInfo.map((keypoint, index) => (
            <div className="Video__info-keypoint">
              <img src={blackThumbnail} alt=""/>
              <div className="Video__info-keypoint-metadata">
                <p className="Video__info-keypoint-metadata-title">{index + 1}. {keypoint.title}</p>
                <div className="Video__info-keypoint-badge">
                  {keypoint.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal size='sm' show={showInfoModal} onHide={handleModalClose} className="Video__info-modal">
        <Modal.Header className="Video__info-modal-header">
          <Modal.Title>Previously Processed Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>As you may have previously realized, the video conversion process takes a really long time due to all the things happening behind the scenes. Fortunately for you, any video that was previously processed (by you or some other user) will get cached in some remote store. That simply means less waiting and more consuming!</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="Video__info-modal-footer">
            <Button onClick={handleModalClose} appearance="primary">
              Ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Video;
