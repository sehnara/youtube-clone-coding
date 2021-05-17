import React, { Component } from 'react';
import Video from './video';

class Videos extends Component {
    

    render() {        
        // 1. variables
        const videos = this.props.videos;
        return (
            <div className="videos">
                <iframe className = "video_hover" 
                    type="text/html" 
                    width="980" 
                    height="545"
                    src={this.props.src}
                    frameBorder="0">
                </iframe> 
                {
                    videos.map(video=>(
                        <Video
                            key={video.id}
                            channelId={video.channelId}
                            title = {video.title}
                            provider={video.provider}
                            details = {video.details}
                            thumbnails = {video.thumbnails}

                            handleHoverVideo={this.props.handleHoverVideo}
                        />
                    ))
                }               
            </div>
        );
    }
}

export default Videos;
