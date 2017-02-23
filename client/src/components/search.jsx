
import React from 'react';
import Input from './input.jsx';
import Table from './table.jsx';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.state = {
      search: ''
    }
  }
  handleEnter(e) {
    if (e.key == "Enter") {
      var location = document.getElementById('location').value
      this.setState({
        search: 'searching...'
      })
  
      var url = ''
      axios.get(url)
        .then(res => {
          var users = res.data
          this.setState({
            search: JSON.stringify(res.data)
          });
        })
    }
  }
  render() {
    return (
      <div>
        <Input handleEnter={this.handleEnter}/>
        <Table data={this.state.search}/>
      </div>
    )
  }
}

export default Search