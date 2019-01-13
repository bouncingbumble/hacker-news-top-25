import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };
  }

  componentDidMount(){
    const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(topStoriesUrl)
    .then(data => data.json())
    .then(data => data.map(id => {
      const url = `${storyUrlBase}${id}.json`;
      return fetch(url)
              .then(d => d.json());
    }))
    .then(promises => Promise.all(promises))
    .then(stories => this.setState({stories}))
  }

  render() {
    let views = <div>Loading..{JSON.stringify(this.state.stories)}.</div>

    return (
      <div className="App">
        <h2>Hacker News Top Stories</h2>
        {views}
      </div>
    );
  }
}

export default App;
