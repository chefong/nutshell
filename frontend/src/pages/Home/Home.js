import React, { useState } from 'react';
import './Home.less';
import { Button } from 'rsuite';
import Input from '../../components/Input/Input';

function Home() {
  const [videoLink, setVideoLink] = useState('');

  const handleInputChange = (value) => {
    setVideoLink(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting value", videoLink);
  }

  return (
    <div className="Home">
      <div className="Home__landing">
        <div className="Home__content">
          <h1 className="Home__content-title">Making video-based learning more productive and efficient.</h1>
          <p className="Home__content-description">Nutshell is a learning tool that helps students and learners of all levels optimize their video learning experience. Got a one hour lecture to get through? We’ll extrapolate the good parts and present it to you in a nutshell.</p>
        </div>
        <div className="Home__submit">
          <Input placeholder="Enter a video link to begin" className="Home__input" onChange={handleInputChange} value={videoLink} />
          <Button appearance="primary" className="Home__button" onClick={handleSubmit}>Get Crackin'</Button>
        </div>
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
      </div>
    </div>
  );
}

export default Home;
