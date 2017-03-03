
import ClickHandler from '../controllers/clickHandler.server';
import serverRender from '../serverRender.js';
import RequestHandler from '../controllers/requestHandler.server';
import CafeFuncs from '../controllers/cafeFuncs.server';

export default function (app, passport) {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.json({ status: 'forbidden' });
  }

  const clickHandler = new ClickHandler();
  const requestHandler = new RequestHandler();
  const cafeFuncs = new CafeFuncs();

  app.route('/api/user')
    .get((req, res) => {
      if (req.user && req.user.twitter) {
        return res.json(req.user.twitter);
      }
      return res.json({ unauth: true });
    });
    
  app.route('/api/yelp')
    .get(requestHandler.getYelpData);

  app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      // failureRedirect: '/login',
      failureRedirect: '/main',
    }));

  app.route('/logout')
    .get((req, res) => {
      req.logout();
      // res.redirect('/login');
      res.redirect('/main');
    });

  app.route('/api/user/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/cafe')
	  .get(cafeFuncs.getCafeInfo)
	  .post(isLoggedIn, cafeFuncs.updateCafe)
	  .delete(isLoggedIn, cafeFuncs.cancel)

  app.route('/*')
    .get(serverRender
      // (req, res) => {
      // res.sendFile(`${path}/public/index.html`);
      // }
    );
}
