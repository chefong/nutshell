import React, { useState, useEffect } from 'react';
import './Loading.less';
import Lottie from 'react-lottie';
import animationData from '../../assets/squirrel.json';
import { Steps } from 'rsuite';
import socketIOClient from 'socket.io-client';
import { BASE_URL } from '../../constants';

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData,
};

const loadingStages = [
  'Extracting video',
  'Summarizing transcript',
  'Splitting video',
  'Stitching video',
];

const lottieSize = 428;

const LOADING_STATUS = {
  EXTRACTING_VIDEO: 0,
  SUMMARIZING_TRANSCRIPT: 1,
  SPLITTING_VIDEO: 2,
  STITCHING_VIDEO: 3,
};

function Loading(props) {
  const { history } = props;
  const [loadingState, setLoadingState] = useState(LOADING_STATUS.EXTRACTING_VIDEO);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    socket.on('loadingUpdate', data => {
      const { loadingStatus, videoId } = data;
      if (loadingStatus === 'DONE' && videoId) {
        history.push(`/video/${videoId}`);
      }

      setLoadingState(LOADING_STATUS[data]);
    });
  }, [history]);

  return (
    <div className="Loading">
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
    </div>
  );
}

export default Loading;
