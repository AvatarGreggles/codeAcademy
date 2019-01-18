import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
  }

  search(){
    console.log('search');
    this.props.onSearch(this.state.term);

  }

  handleTermChange(event){

    this.setState({term: event.target.value});
  }

  enterSearch(event){
   if(event.keyCode === 13) {
     console.log('Enter Search');
     if(this.state.term !== ''){
     this.props.onSearch(this.state.term);
   }else{
     alert('Please enter a search term!');
   }
   }
 }

  componentDidMount(){
    document.addEventListener("keydown", this.enterSearch, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.enterSearch, false);
  }

  render(){
    return(
      <div className="SearchBar">
  <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
  <div onClick={this.search} className="Search-Button">SEARCH</div>
</div>
    )
  }
}

export default SearchBar;
