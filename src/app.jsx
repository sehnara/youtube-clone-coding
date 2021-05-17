import React, { Component } from 'react';
import './app.css';
import Search from './components/search';
import SearchVideos from './components/searchVideos';
import Videos from './components/videos';

class App extends Component {    
  // 1. state  
  state = {
    videos:[],
    hoverVideo : '',
    hoverSrc : '',
    searchOn : false,
    searchInput : ''
  };

// 1. Getting youtube API  
  componentDidMount=()=> {
    const idNum = React.createRef(1) // - key
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=26&key=AIzaSyAzx57fXhAdROZ_fhWhb_T9ukLhSMTjYYk", requestOptions)
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
          thumbnails : video.snippet.thumbnails.high.url // 이거 좀 삐리하다
        }
        videoArr.push(videoObj);
        idNum.current+=1;
      })
      
      this.setState({videos:videoArr});    
      this.setState({hoverVideo:this.state.videos[0].channelId})  
      this.setState({hoverSrc: `http://www.youtube.com/embed/${this.state.hoverVideo}`})
    })
    .catch(error => console.log('error', error));         
  }  

  // Method
  handleHoverVideo =(channelId)=>{         
    this.setState({hoverVideo:channelId})    
    const src = `http://www.youtube.com/embed/${this.state.hoverVideo}`
    this.setState({hoverSrc:src});
  }  

  handleSearch=(input)=>{
    this.setState({searchOn:true})
    this.setState({searchInput:input})      
  }
  handleClick = () =>{
    this.setState({searchOn:false})
  }


  // 2. render()
  render(){   
    return (    
      <>      
        <Search
          onSearch = {this.handleSearch}
          onClick = {this.handleClick}
        /> 
        {
          !this.state.searchOn&&
          <Videos
            videos={this.state.videos}
            src = {this.state.hoverSrc}
            
            handleHoverVideo={this.handleHoverVideo}          
          />     
        }
        {
          this.state.searchOn&&          
          <SearchVideos             
            input = {this.state.searchInput}
          />          
        }        
      </>
    );
  };
} 

export default App;
