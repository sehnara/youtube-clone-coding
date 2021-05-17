import React, { Component } from 'react';

class Search extends Component {
    inputRef = React.createRef();

    handleSearch=(e)=>{
        e.preventDefault();
        const input = this.inputRef.current.value;
        this.props.onSearch(input);
        this.inputRef.current.value='';
    }    

    handleClick =()=>{
        this.props.onClick();
    }
    render() {
        return (
            <div className="header">
                <div className="Search-bar">
                    <div 
                        className="logo-container"
                        onClick={this.handleClick}
                    >
                        <span className="logo"><i className="fab fa-youtube"></i></span>
                        <span className="site-title">SehoonTube</span>
                    </div>
                    <form 
                        className="search-form"
                        onSubmit ={this.handleSearch}
                    >                     
                        <input   
                            ref = {this.inputRef}                     
                            className="input-search"
                            type="text" 
                            placeholder="  Search..."
                            onSubmit = {this.handleSearch}
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