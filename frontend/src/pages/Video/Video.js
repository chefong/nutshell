import React, { useState, useEffect } from 'react';
import './Video.less';
import { Player, BigPlayButton } from 'video-react';
import Button from '../../components/Button/Button';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/images/x.svg';
import { Modal, Loader } from 'rsuite';
import { useParams } from 'react-router-dom';
import Overview from './Overview/Overview';
import Details from './Details/Details';
import clsx from 'clsx';

const tabs = ['Overview', 'Details'];

function Video() {
  const [showBanner, setShowBanner] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const { videoId } = useParams();

  useEffect(() => {

  }, []);

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

  const handleTabClick = (e, tabName) => {
    e.preventDefault();
    setActiveTab(tabName);
  };

  const renderTabs = () => {
    return (
      <div className="Video__tabs">
        <div className="Video__tabs-container">
          {tabs.map(tab => (
            <div className={clsx('Video__tab', tab === activeTab && 'Video__tab--underline')} onClick={e => handleTabClick(e, tab)}>{tab}</div>
          ))}
        </div>
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
      {videoData ? (
        <Player src='http://media.w3.org/2010/05/bunny/movie.mp4' fluid={false} height={500} width="100%">
          <BigPlayButton position="center" />
        </Player>
      ) : (
        <div className="Video__player-placeholder">
          <Loader speed="slow" size="lg" className="Video__player-loader" />
        </div>
      )}
      {renderTabs()}
      {activeTab === 'Overview' ? (
        <Overview />
      ) : (
        <Details />
      )}
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
