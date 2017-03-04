import React from 'react';
import Input from './input.jsx';
import ajax from '../utils/ajax.js';
import axios from 'axios';
import cookie from 'react-cookie';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleEnter = this.handleEnter.bind(this)
    this.clickGoingHandler = this.clickGoingHandler.bind(this)
    this.state = {
      search: ''
    }

  }

  componentDidMount() {
    if (this.props.user.username != 'guest') {
      var location = window.localStorage.getItem('ch_location')
      document.getElementById('location').value = location
      this.updateResults(location)
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem('ch_location', '')
  }

  clickGoingHandler(e) {
    if (this.props.user.username != 'guest') {

      var params = {
        cafe_id: e.currentTarget.id,
        user_id: this.props.user.id
      }
      var location = document.getElementById('location').value
      var cafe_id = e.currentTarget.id
      axios.post('/api/cafe', params)
        .then((data) => {
          document.getElementById(cafe_id).childNodes[0].childNodes[0].nodeValue = data.data.newValue;
        })
    }
    else
      window.location = window.location.origin + '/auth/twitter'
  }

  updateResults(location) {
    this.setState({
      search: (<div className="loader"></div>)
    })

    window.localStorage.setItem('ch_location', location)

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
                      <div className="going-div clickable" id={cafe.id} onClick={this.clickGoingHandler}>
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

  handleEnter(e) {
    var location = document.getElementById('location').value
    if (e.key == "Enter" && location) {
      this.updateResults(location)
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
