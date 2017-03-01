import React from 'react';
import Input from './input.jsx';
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
      var params = '?location=' + location
      ajax('get', '/api/yelp' + params)
        .then((data) => {
          var cafes = []
          data.businesses.forEach((cafe) => {
            cafes.push(
              <div className="cafe-result">
                    <div className="result-image-div">
                        <img className="result-image" src={cafe.image_url}/>
                    </div>
                    <div className="result-div">
                      <div className="">
                          <h4><a href={cafe.url}>{cafe.name}</a></h4>
                      </div>
                      <div className="">
                          {cafe.location.display_address[0]}
                      </div>
                    </div>
              </div>
            )
          })
          
          var results =  (
              <div className="results">
              {cafes}
              </div>
            )

          this.setState({
            search: results
          })
        })
    }
  }
  render() {
    return (
      <div>
        <Input handleEnter={this.handleEnter}/>
        <br/>
        <div>{this.state.search}</div>
      </div>
    )
  }
}

export default Search
