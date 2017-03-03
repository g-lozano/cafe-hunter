import Cafes from '../models/cafes.js';
import Cafe from '../models/cafes.js';

function CafeFuncs() {
    this.updateCafe = (req, res) => {

    };

    this.getCafeInfo = (req, res) => {
        Cafes.findOne({
            'cafe_id': req.query.cafe_id
        }, (err, cafe) => {
            if (err) throw err

            if (cafe) {
                res.status(200).json(cafe);
            }
            else {
                var newCafe = new Cafe();

                newCafe.cafe_id = req.query.cafe_id;
                newCafe.going_users_id = [];

                newCafe.save(
                    (err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json(newCafe);
                    });
            }
        });
    };

    this.cancel = (req, res) => {

    }
}

module.exports = CafeFuncs;
