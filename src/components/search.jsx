import React, { Component } from 'react';

class Search extends Component {

    render() {
        return (
            <div className="header">
                <div className="Search-bar">
                    <span className="logo"><i className="fab fa-youtube"></i></span>
                    <span className="site-title">SehoonTube</span>
                    <form className="search-form">                     
                        <input                        
                            className="input-search"
                            type="text" 
                            placeholder="  Search..."
                        />
                        <button className="button-search">
                            <i className="fas fa-search"></i>
                        </button>
                    </form>                
                </div>                              
            </div>
        );
    }
}

export default Search;