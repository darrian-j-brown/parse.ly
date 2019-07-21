import React, { Component } from 'react';

import axios from 'axios';
import queryString from 'query-string';
import Search from './components/Search.jsx';
import SongList from './components/SongList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: '',
      query: '',
      songs: [],
      polarity: '',
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.songTitleClick = this.songTitleClick.bind(this);
    this.handlePositivePolarity = this.handlePositivePolarity.bind(this);
    this.handleNegativePolarity = this.handleNegativePolarity.bind(this);
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      this.props.history.push('/music');
    }
  }

  clickSearch() {
    const { query } = this.state;
    return axios.get(`/search/${query}`).then((response) => {
      this.setState({
        songs: response.data,
      });
    });
  }

  handleChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  songTitleClick(title) {
    return axios.get(`/video/${title}`).then((response) => {
      this.setState({
        video: response.data,
      });
    });
  }

  handleNegativePolarity() {
    this.setState({
      polarity: 'negative',
    });
  }

  handlePositivePolarity() {
    this.setState({
      polarity: 'positive',
    });
  }


  render() {
    const {
      query, songs, polarity, video,
    } = this.state;
    return (
      <React.Fragment>
        <a href="/auth/google" className="button">
          <div>
            <span className="svgIcon t-popup-svg">
              <svg
                className="svgIcon-use"
                width="25"
                height="37"
                viewBox="0 0 25 25"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
            </span>
            <span className="button-label">Sign in with Google</span>
          </div>
        </a>

        <div className="navbar">
          <h1>Who do you want to listen to?</h1>
          <div className="searchbar">
            <Search
              query={query}
              change={this.handleChange}
              search={this.clickSearch}
              positivePolarity={this.handlePositivePolarity}
              negativePolarity={this.handleNegativePolarity}
            />
          </div>
        </div>
        <div className="section">
          <div className="player">
            <VideoPlayer video={video} />
          </div>
          <div className="songTitles">
            <SongList songs={songs} polarity={polarity} songTitleClick={this.songTitleClick} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
