
import React from 'react';
import Input from './input.jsx';
import Table from './table.jsx';
import ajax from '../utils/ajax.js'
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.state = {
      search: ''
    }
  }
  handleEnter(e) {
      var location = document.getElementById('location').value
      if (e.key == "Enter" && location) {
        this.setState({
          search: 'searching...'
        })
        var params = '?location='+location
        ajax('get', '/api/yelp'+params)
          .then((data) => {
            //format
            this.setState({
                  search: JSON.stringify(data)
                })
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