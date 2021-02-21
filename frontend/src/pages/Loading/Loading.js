import React, { useState, useEffect } from 'react';
import './Loading.less';
import Lottie from 'react-lottie';
import animationData from '../../assets/squirrel.json';
import { Steps } from 'rsuite';
import { subscribeToLoadingUpdates, disconnectSocket, subscribeToReconnect } from '../../socket';
import logo from '../../assets/images/logo.svg';
import Footer from '../../components/Footer/Footer';
import closeIcon from '../../assets/images/x.svg';

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData,
};

const loadingStages = [
  'Downloading video...',
  'Splitting audio and video...',
  'Transcribing... (this might take a while)',
  'Summarizing...',
  'Stitching things together...',
];

const lottieSize = 428;

const LOADING_STATUS = {
  downloading: 0,
  demuxing: 1,
  transcribing: 2,
  summarizing: 3,
  stitching: 4,
  done: 5,
};

function Loading(props) {
  const { history, location } = props;
  const etaTime = location && location.state && location.state.etaTime;
  const [loadingState, setLoadingState] = useState(LOADING_STATUS.EXTRACTING_VIDEO);
  const [showBanner, setShowBanner] = useState(etaTime);
  const processingVideoId = localStorage.getItem('processingVideoId');

  useEffect(() => {
    // subscribeToReconnect(processingVideoId);

    subscribeToLoadingUpdates((err, data) => {
      console.log("Got back data from socket in useEffect", data);
      const { stage, videoId, percentage } = data;
      if (stage === 'done' && videoId && percentage) {
        history.push(`/video/${videoId}/${percentage}`);
        return;
      }

      if (LOADING_STATUS[stage]) setLoadingState(LOADING_STATUS[stage]);
    });

    return () => {
      disconnectSocket();
    }
  }, [history, processingVideoId]);

  const handleBannerClose = (e) => {
    e.preventDefault();
    setShowBanner(false);
  };

  console.log("Got etaTime", location);

  return (
    <div className="Loading">
      <div className="Loading__logo">
        <img src={logo} alt=""/>
      </div>
      {showBanner && <div className="Loading__etaBanner">
        <p className="Video__banner-text">According to our ML models, your video should done in about {Math.floor(etaTime / 60)} minute(s).</p>
        <img src={closeIcon} className="Loading__etaBanner-close" onClick={handleBannerClose} alt=""/>
      </div>}
      <div className="Loading__lottie">
        <Lottie options={defaultOptions}
          height={lottieSize}
          width={lottieSize}
        />
      </div>
      <div className="Loading__steps">
        <Steps current={loadingState}>
          {loadingStages.map(loadingStage => (
            <Steps.Item title={loadingStage} />
          ))}
        </Steps>
      </div>
      <Footer />
    </div>
  );
}

export default Loading;
