import React from 'react';
import './Footer.less';
import acornLogo from '../../assets/images/acorn.svg';

function Footer() {
  return (
    <div className="Footer">
      <img src={acornLogo} alt=""/>
      <p className="Footer__name">2021 © Nutshell Technologies, Inc.</p>
    </div>
  )
}

export default Footer;
