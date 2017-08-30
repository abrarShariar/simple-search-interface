import React, { Component } from 'react';


//component to be displayed with the search box and search results

class SearchBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="SearchBox">
                <h1> This is the search box </h1>
            </div>
        )
    }
}

export default SearchBox;