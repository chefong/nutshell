import React, { useState } from 'react';
import './Home.less';
import { Button } from 'rsuite';
import Input from '../../components/Input/Input';
import logo from '../../assets/images/logo.svg';
import githubButton from '../../assets/images/github-button.svg';
import videoImage from '../../assets/images/about-video.svg';
import transcriptImage from '../../assets/images/about-transcript.svg';
import keypointsImage from '../../assets/images/about-keypoints.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import aboutImage from '../../assets/images/about.svg';

function Home() {
  const [videoLink, setVideoLink] = useState('');

  const handleInputChange = (value) => {
    setVideoLink(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting value", videoLink);
  };

  const renderInputForm = () => {
    return (
      <div className="Home__input-form">
        <Input placeholder="Enter a video link to begin" className="Home__input" onChange={handleInputChange} value={videoLink} />
        <Button appearance="primary" className="Home__input-button" onClick={handleSubmit}>Get Crackin'</Button>
      </div>
    );
  };

  return (
    <div className="Home">
      <div className="Home__navbar">
        <img src={logo} alt=""/>
        <div className="Home__navbarlinks">
          <ul className="Home__navbarlinks-list">
            <li>Features</li>
            <li>About</li>
            <img src={githubButton} alt=""/>
          </ul>
        </div>
      </div>
      <div className="Home__landing">
        <div className="Home__content">
          <h1 className="Home__content-title">Making video-based learning more productive and efficient.</h1>
          <p className="Home__content-description">Nutshell is a learning tool that helps students and learners of all levels optimize their video learning experience. Got a one hour lecture to get through? We’ll extrapolate the good parts and present it to you in a nutshell.</p>
        </div>
        {renderInputForm()}
      </div>
      <div className="Home__display">
        <div className="Home__display-content">
          <h2 className="Home__display-content-title">Watch a short, strategically stitched video!</h2>
          <p className="Home__display-content-description">Submit a long video and we’ll present to you a shorter video that only showcases the most important parts of the video.</p>
          <div className="Home__learn">
            <p className="Home__learn-link">Learn More</p>
            <img src={rightArrow} alt=""/>
          </div>
        </div>
        <img src={videoImage} alt=""/>
      </div>
      <div className="Home__display">
        <img src={transcriptImage} alt=""/>
        <div className="Home__display-content">
          <h2 className="Home__display-content-title">In a time crunch? Just read the transcript!</h2>
          <p className="Home__display-content-description">Sometimes reading things is faster than watching things. We can relate! Therefore, we’ve provided the transcripts to the most important parts of the video for you!</p>
          <div className="Home__learn">
            <p className="Home__learn-link">Learn More</p>
            <img src={rightArrow} alt=""/>
          </div>
        </div>
      </div>
      <div className="Home__display">
        <div className="Home__display-content">
          <h2 className="Home__display-content-title">Easily visualize the most important keypoints.</h2>
          <p className="Home__display-content-description">Figuring out the important parts of a long video is hard. Nutshell does the hard work for you and provides the timestamps and the keypoints of the entire video.</p>
          <div className="Home__learn">
            <p className="Home__learn-link">Learn More</p>
            <img src={rightArrow} alt=""/>
          </div>
        </div>
        <img src={keypointsImage} alt=""/>
      </div>
      <div className="Home__about">
        <div className="Home__about-content">
          <h2 className="Home__about-title">About Nutshell</h2>
          <p className="Home__about-description">You have an exam coming up. The only materials you have to study off of are the 20, one-hour long, lecture videos that your professor haphazardly uploaded. We’ve been there and we’re here to help you get through it.</p>
          <br />
          <p className="Home__about-description">Nutshell is created by a group of students who are more than familiar with the difficulty of learning from home. We want to create a learning tool that helps students digest content easier and more efficiently.</p>
          <br />
          <p className="Home__about-description">We have one mission: to create a delightful learning experience to help students through these difficult times.</p>
        </div>
        <img src={aboutImage} alt=""/>
      </div>
    </div>
  );
}

export default Home;
