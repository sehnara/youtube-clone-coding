import React, { Component } from 'react';
import './app.css';
import Search from './components/search';
import Videos from './components/videos';

class App extends Component {  
  
  // 1. state  
  state = {
    videos:[],
    hoverVideo : '',
    hoverSrc : ''
  };

// 1. Getting youtube API  
  componentDidMount=()=> {
    const idNum = React.createRef(1) // - key
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://youtube.googleapis.com/youtube/v3/videos?&part=snippet&chart=mostPopular&maxResults=26&key=AIzaSyDGgWM2b6ovCQZJ77_AlhP5MKVWKr2gGEw", requestOptions)
    .then(response => response.text())
    .then(result =>{
      const api = JSON.parse(result).items;    
      const videoArr = [];

      api.map((video)=>{
        const videoObj = {
          id : idNum.current,
          channelId : video.id,
          title : video.snippet.title,
          provider : video.snippet.channelTitle,
          details : video.snippet.publishedAt,
          thumbnails : video.snippet.thumbnails.standard.url
        }
        videoArr.push(videoObj);
        idNum.current+=1;
      })
      this.setState({videos:videoArr});      
    })
    .catch(error => console.log('error', error));         
  }  
  handleHoverVideo =(channelId)=>{         
    this.setState({hoverVideo:channelId})    
    const src = `http://www.youtube.com/embed/${this.state.hoverVideo}`
    this.setState({hoverSrc:src});
  }
  // 2. render()
  render(){   
    return (    
      <>      
        <Search/> 
        <Videos
          videos={this.state.videos}
          src = {this.state.hoverSrc}
          handleHoverVideo={this.handleHoverVideo}
        />     
      </>
    );
  };
} 

export default App;
