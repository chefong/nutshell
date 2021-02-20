import React from 'react';
import './Loading.less';
import Lottie from 'react-lottie';
import animationData from '../../assets/squirrel.json';
import { Steps } from 'rsuite';

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

function Loading() {
  return (
    <div className="Loading">
      <div className="Loading__lottie">
        <Lottie options={defaultOptions}
          height={lottieSize}
          width={lottieSize}
        />
      </div>
      <div className="Loading__steps">
      <Steps current={1}>
        {loadingStages.map(loadingStage => (
          <Steps.Item title={loadingStage} />
        ))}
      </Steps>
      </div>
    </div>
  );
}

export default Loading;
