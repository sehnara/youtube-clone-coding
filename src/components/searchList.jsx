import React, { Component } from 'react';

class SearchList extends Component {
    render() {
        const style = {
            backgroundImage : `url(${this.props.thumbnails})`,
            backgroundSize : 'cover',
            backgroundRepeat: 'no-repeat',     
            backgroundPosition: 'center'       
        };
        return (
            <div className="right-list">
                <span className="right-thumbnail" style={style}></span>
                <div className="right-detail">
                    <span className="right-title">{this.props.title}</span>
                    <span className="right-provider">{this.props.provider}</span>
                </div>
            </div>
        );
    }
}

export default SearchList;