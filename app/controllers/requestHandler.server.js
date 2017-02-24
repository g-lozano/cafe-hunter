import request from 'request'

function RequestHandler() {
    this.getYelpData = (req, res) => {

        request.post({
            url: 'https://api.yelp.com/oauth2/token',
            form: {
                client_id: process.env.YELP_APP_ID,
                client_secret: process.env.YELP_APP_SECRET
            }
        }, function(err, response, body) { 
            if (err) throw err
            
            var data = JSON.parse(body)
            var url = 'https://api.yelp.com/v3/businesses/search?'
                url += 'location=' + req.query.location
                url += '&term=cafe'
            
            var options = {
                url: url,
                headers: {
                    Authorization: 'Bearer ' + data.access_token
                }
            };

            request(options, (err, response, body) => {
                if (err) throw err
                res.status(200).json(JSON.parse(body))
            });
        })
    };
}

module.exports = RequestHandler;
