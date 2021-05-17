import React, { Component } from 'react';

class Video extends Component {
    handleMouseHover =(event) =>{
        event.preventDefault();
        this.props.handleHoverVideo(this.props.channelId);
    }
    handleClick = ()=>{

    }

    render() {
        const style = {
            backgroundImage : `url(${this.props.thumbnails})`,
            backgroundSize : 'cover',
        };
        
        return (
            <div 
                className="video" 
                onMouseEnter={this.handleMouseHover}
                onMouseOver = {this.handleMouseHover}                
            >
                <span className="video-thumbnail" style = {style}></span>
                <div className="video-detail">
                    <span className="video-title">{this.props.title}</span>
                    <span className="video-provider">{this.props.provider}</span>
                    <span className="video-opts">{this.props.details}</span>
                </div>
            </div>
        );
    }
}

export default Video;
