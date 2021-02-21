import React, { useState, useEffect } from 'react';
import './Home.less';
import { Slider, Modal } from 'rsuite';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import logo from '../../assets/images/logo.svg';
import githubIcon from '../../assets/images/github.svg';
import videoImage from '../../assets/images/about-video.svg';
import transcriptImage from '../../assets/images/about-transcript.svg';
import keypointsImage from '../../assets/images/about-keypoints.svg';
import rightArrow from '../../assets/images/arrow-right.svg';
import aboutImage from '../../assets/images/about.svg';
import clsx from 'clsx';
import { initiateSocket } from '../../socket';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import Footer from '../../components/Footer/Footer';

const sliderValues = {
  min: 10,
  max: 90,
};

const averageValue = Math.floor((sliderValues.max + sliderValues.min) / 2);

const displayContent = [
  {
    title: 'Watch a short, strategically stitched video!',
    description: 'Submit a long video and we’ll present to you a shorter video that only showcases the most important parts of the video.',
    image: videoImage,
    imagePlacement: 'right',
  },
  {
    title: 'In a time crunch? Just read the transcript!',
    description: 'Sometimes reading things is faster than watching things. We can relate! Therefore, we’ve provided the transcripts to the most important parts of the video for you!',
    image: transcriptImage,
    imagePlacement: 'left',
  },
  {
    title: 'Easily visualize the most important keypoints.',
    description: 'Figuring out the important parts of a long video is hard. Nutshell does the hard work for you and provides the timestamps and the keypoints of the entire video.',
    image: keypointsImage,
    imagePlacement: 'right',
  },
];

function Home(props) {
  const { history } = props;
  const [videoLink, setVideoLink] = useState('');
  const [showSlider, setShowSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoPercentage, setVideoPercentage] = useState(averageValue);

  useEffect(() => {
    if (localStorage.getItem('processingVideoId')) {
      localStorage.removeItem('processingVideoId');
    }
  }, []);

  const handleNextClick = () => {
    setShowSlider(true);
  };

  const handleBackClick = () => {
    setShowSlider(false);
  };

  const handleInputChange = (value) => {
    setVideoLink(value);
  };

  const handleVideoSubmit = async () => {
    console.log("Submitting value", videoLink, videoPercentage);

    setIsLoading(true);
    initiateSocket(videoLink);

    try {
      let response;

      response = await axios.post(`${BASE_URL}/submit`, { videoLink, videoPercentage });
      const { alreadyShortened, videoId, inProgress } = response.data;
      console.log("Response from POST", response);

      if (alreadyShortened) {
        setIsLoading(false);
        history.push(`/video/${videoId}/${videoPercentage}`, { alreadyShortened });
      } else {
        if (!inProgress) axios.get(`${BASE_URL}/process/${videoId}/${videoPercentage}`);
        localStorage.setItem('processingVideoId', videoId);
        console.log("Going to /loading");
        history.push('/loading');
      }

      setIsLoading(false);
    } catch (error) {
      console.log("Got an error from submit", error);
      setIsLoading(false);
    }
  };

  const renderInputForm = () => {
    return (
      <div className="Home__input-form">
        <p className="Home__form-description">Nutshell is a learning tool that helps students and learners of all levels optimize their video learning experience. Got a one hour lecture to get through? We’ll extrapolate the good parts and present it to you in a nutshell.</p>
        <Input placeholder="Enter a YouTube link to begin" onChange={handleInputChange} value={videoLink} />
        <Button appearance="primary" className="Home__input-button" onClick={handleNextClick}>Next</Button>
      </div>
    );
  };

  const handleSliderChange = (value) => {
    setVideoPercentage(value);
  };

  const renderSliderForm = () => {
    return (
      <div className="Home__input-slider">
        <p className="Home__form-description">Nice video! <br /> How much of the video do you want to see?</p>
        <div className="Home__slider">
          <Slider
            progress
            graduated
            step={10}
            disabled={isLoading}
            defaultValue={averageValue}
            max={sliderValues.max}
            min={sliderValues.min}
            onChange={handleSliderChange}
            value={videoPercentage}
          />
          <div className="Home__slider-labels">
            <p className="Home__slider-label">{sliderValues.min}%</p>
            <p className="Home__slider-label">{sliderValues.max}%</p>
          </div>
        </div>
        <div className="Home__slider-buttons">
          <Button
            appearance="ghost"
            className="Home__slider-back"
            onClick={handleBackClick}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            appearance="primary"
            className="Home__slider-submit"
            onClick={handleVideoSubmit}
            loading={isLoading}
          >
            Get Crackin'
          </Button>
        </div>
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
            <Button appearance="ghost">
              <img className="Home__navbar-github-icon" src={githubIcon} alt=""/>
              <p>GitHub</p>
            </Button>
          </ul>
        </div>
      </div>
      <div className="Home__landing">
        <div className="Home__content">
          <h1 className="Home__content-title">Making video-based learning more productive and efficient.</h1>
        </div>
        {showSlider ? (
          renderSliderForm()
        ) : (
          renderInputForm()
        )}
      </div>
      {displayContent.map(content => (
        <div className={clsx('Home__display', content.imagePlacement === 'right' && 'Home__display--reverse')}>
          <img src={content.image} alt=""/>
          <div className="Home__display-content">
            <h2 className="Home__display-content-title">{content.title}</h2>
            <p className="Home__display-content-description">{content.description}</p>
            <div className="Home__learn">
              <p className="Home__learn-link">Learn More</p>
              <img src={rightArrow} alt=""/>
            </div>
          </div>
        </div>
      ))}
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
      <Footer />
    </div>
  );
}

export default Home;
