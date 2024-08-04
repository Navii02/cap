import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
  
function Footer  ()  {

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        {/*<p className='footer-subscription-heading'>
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>*/}
        <div className='input-areas'>
         {/*<form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>*/}
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Button buttonStyle='btn--outline'><Link to="/about-us">About Us</Link></Button>
          </div>
          <div className='footer-link-items'>
          <Button buttonStyle='btn--outline'><Link to="/contact">Contact Us</Link></Button>
        </div>
        </div>
        </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='https://cep.ac.in/' className='social-logo'>
              CAP
              <i className='fa fa-graduation-cap' />
            </Link>
          </div>
          <small className='website-rights'>College Of Engineering Poonjar © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='https://www.facebook.com/profile.php?id=100013005493803&mibextid=ZbWKwL'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='https://www.instagram.com/cepoonjar?igsh=czRhMmVtZ3l6ZnJw'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='https://youtube.com/@cepfilmsociety?si=1IQzud2MvnvWl0z_'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            {/*<Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>*/}
            <Link
              className='social-icon-link twitter'
              to='https://www.linkedin.com/school/college-of-engineering-poonjar-kottayam/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;