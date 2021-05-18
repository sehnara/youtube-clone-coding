import React, { Component } from 'react';
import SearchList from './searchList';

class SearchVideos extends Component {
    
    state = {
        videos : [],
        mainVideo : {

        }
    };

    componentDidMount = ()=>{
        const idNum = React.createRef(1) // - key
        const requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        const src = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${this.props.input}&key=AIzaSyAzx57fXhAdROZ_fhWhb_T9ukLhSMTjYYk`
        fetch(src, requestOptions)
            .then(response => response.text())
            .then(result =>{
                const api = JSON.parse(result).items;  
               console.log(api[0])
                const main = {
                    videoId : api[0].id.videoId,
                    provider : api[0].snippet.channelTitle,
                    title : api[0].snippet.title,
                    desc : api[0].snippet.description
                };
                this.setState({mainVideo:main});

                const searchedArr = [];
                api.map((video)=>{
                    const videoObj = {
                    id : idNum.current,
                    videoId : video.id.videoId,
                    title : video.snippet.title,
                    provider : video.snippet.channelTitle,
                    description : video.snippet.description,
                    thumbnails : video.snippet.thumbnails.high.url
                }
                
                searchedArr.push(videoObj);
                idNum.current+=1;
            })                     
            
            this.setState({videos:searchedArr})
        })
        .catch(error => console.log('error', error));     
    }

    render() {    
        const videos = [...this.state.videos];   
        // console.log(this.props.input);        
        const src =  `https://www.youtube.com/embed/${this.state.mainVideo.videoId}`     
        return (
            <div className="video-info">
                <div className="info-left">
                    <iframe 
                        className = "searched-video"
                        width="680" 
                        height="378" 
                        src={src}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>
                    <div className="searched-details">
                        <h2 className="searched-title">{this.state.mainVideo.title}</h2>
                        <p className="searched-provider">{this.state.mainVideo.provider}</p>
                        <p className="searched-summary"></p>
                        <p className="searched-links"></p>
                        <p className="searched-para">{this.state.mainVideo.desc}</p>
                    </div>
                </div>
                <div className="info-right"> 
                    {
                        videos.map(video=>{
                           return <SearchList 
                            key = {video.id}
                            thumbnails = {video.thumbnails}
                            title = {video.title}
                            provider = {video.provider}
                           />                              
                        })
                    }                                      
                </div>                
            </div>
        );
    }
}

export default SearchVideos;
