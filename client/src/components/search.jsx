import React from 'react';
import Input from './input.jsx';
import ajax from '../utils/ajax.js'
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.clickGoingHandler = this.clickGoingHandler.bind(this)
    this.state = {
      search: ''
    }
  }

  clickGoingHandler() {
    
  }
  
  handleEnter(e) {
    var location = document.getElementById('location').value
    if (e.key == "Enter" && location) {
      this.setState({
        search: 'searching...'
      })

      var params = '?location=' + location
      ajax('get', '/api/yelp' + params) // get list of cafes via YELP
        .then((data) => {
          var cafes = []
          data.businesses.forEach((cafe) => { // get cafe info from db
              var cafe_id = '?cafe_id=' + cafe.id
              ajax('get', '/api/cafe' + cafe_id)
                .then((cafe_obj) => {
                  cafes.push(
                      <div className="cafe-result">
                      <div className="result-image-div">
                        <img className="result-image" src={cafe.image_url}/>
                      </div>
                      <div className="result-div">
                        <h3><a href={cafe.url}>{cafe.name}</a></h3>
                        {cafe.location.display_address[0]}
                      </div>
                      <div className="going-div clickable" onClick={this.clickGoingHandler}>
                        {cafe_obj.going_users_id.length} going
                      </div>
                    </div>
                    ) //end cafe.push
                    
                  var results = (
                    <div className="results">
                      {cafes}
                    </div>
                  )

                  this.setState({
                    search: results
                  })
                }) // end then (cafe_obj)
            }) // end forEach
        }) //end then (data)
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
