import React from 'react';
import './Video.less';
import { Player, BigPlayButton } from 'video-react';
import { Button } from 'rsuite';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Video() {
  return (
    <div className="Video">
      <div className="Video__navbar">
        <img src={logo} alt=""/>
        <Link to="/"><Button appearance="primary" className="Video__navbar-button">Start Again</Button></Link>
      </div>
      <div className="Video__player">
        <Player src='http://media.w3.org/2010/05/bunny/movie.mp4' fluid={false} height={500} width="100%">
          <BigPlayButton position="center" />
        </Player>
      </div>
    </div>
  );
}

export default Video;
