import Cafes from '../models/cafes.js';
import Cafe from '../models/cafes.js';

function CafeFuncs() {
    this.updateCafe = (req, res) => {
        Cafes
            .findOne({
                'cafe_id': req.body.cafe_id
            })
            .exec((err, cafe) => {
                if (err) {
                    throw err;
                }
                var index = cafe.going_users_id.indexOf(req.body.user_id);
                if (index > -1) { // user's id is found, remove
                    Cafes.findOneAndUpdate({
                            'cafe_id': req.body.cafe_id
                        }, {
                            $pull: {
                                going_users_id: req.body.user_id
                            }
                        })
                        .exec((err, result) => {
                            if (err) {
                                throw err;
                            }
                            res.status(200).json({
                                newValue: result.going_users_id.length - 1
                            });
                        });
                }
                else { // user's id is not found, add
                    Cafes.findOneAndUpdate({
                            'cafe_id': req.body.cafe_id
                        }, {
                            $addToSet: {
                                going_users_id: req.body.user_id
                            }
                        })
                        .exec((err, result) => {
                            if (err) {
                                throw err;
                            }
                            res.status(200).json({
                                newValue: result.going_users_id.length + 1
                            });
                        });
                }
            });
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
