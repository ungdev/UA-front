import React from 'react';
import { LogoSVG } from '../components/UI';

const Home = () => {
  return (
    <div id="home">
      <div className="home-header">
        <div id="logo">
          <LogoSVG />
        </div>
        <div className="home-title">
          <p className="main">L'UTT Arena revient</p>
          <p>
            les <span className="date">02</span>, <span className="date">03</span> et <span className="date">04</span>{' '}
            décembre 2022&nbsp;!
          </p>
        </div>
        <div className="social">
          <a
            href="https://www.facebook.com/UTTArena"
            className="facebook-link"
            aria-label="Page Facebook"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-facebook-f" />
          </a>
          <a
            href="https://twitter.com/UTTArena"
            className="twitter-link"
            aria-label="Page Twitter"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-twitter" />
          </a>
          <a
            href="https://www.instagram.com/uttarena/"
            className="instagram-link"
            aria-label="Page Instagram"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://discord.gg/WhxZwKU"
            className="discord-link"
            aria-label="Serveur Discord"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-discord" />
          </a>
          <a
            href="https://www.youtube.com/user/UTTNetGroup/"
            className="youtube-link"
            aria-label="Chaîne Youtube"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-youtube" />
          </a>
          <a
            href="https://www.twitch.tv/uttarena"
            className="twitch-link"
            aria-label="Chaîne Twitch"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fab fa-twitch" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
