import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import './About.css';

export default function About() {
  return (
    <div className='about-joy'>
      <div>Joy O’Halloran</div>
      <a
        className='icon'
        target='_blank'
        rel='noreferrer'
        href='https://github.com/ohalloranjm'
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        className='icon'
        target='_blank'
        rel='noreferrer'
        href='https://www.linkedin.com/in/joy-ohalloran/'
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a
        className='icon'
        target='_blank'
        rel='noreferrer'
        href='https://ohalloranjm.github.io/'
      >
        <FontAwesomeIcon icon={faFolder} />
      </a>
    </div>
  );
}
