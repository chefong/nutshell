import React, { useState } from 'react';
import './Video.less';
import { Player, BigPlayButton } from 'video-react';
import Button from '../../components/Button/Button';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import closeIcon from '../../assets/images/x.svg';

function Video() {
  const [showBanner, setShowBanner] = useState(true);

  const handleBannerClose = (e) => {
    e.preventDefault();
    setShowBanner(false);
  };

  const renderInfoBanner = () => {
    return (
      <div className="Video__banner">
        <p className="Video__banner-text">Wow! That was fast, wasn’t it?  <span className="Video__banner-link">Click here to find out why</span></p>
        <img src={closeIcon} className="Video__banner-close" onClick={handleBannerClose} alt=""/>
      </div>
    );
  };

  return (
    <div className="Video">
      <div className="Video__navbar">
        <img src={logo} alt=""/>
        <Link to="/"><Button appearance="primary">Start Again</Button></Link>
      </div>
      {showBanner && renderInfoBanner()}
      <div className="Video__player">
        <Player src='http://media.w3.org/2010/05/bunny/movie.mp4' fluid={false} height={500} width="100%">
          <BigPlayButton position="center" />
        </Player>
      </div>
    </div>
  );
}

export default Video;
