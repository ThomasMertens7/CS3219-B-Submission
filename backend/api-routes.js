// api-routes.js
// Initialize express router
import express from 'express';
let router = express.Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import footballTeam controller
import {index, create, view, update, remove} from './footballTeamController.js';
// footballTeam routes
router.route('/footballTeams')
    .get(index)
    .post(create);
router.route('/footballTeams/:footballTeam_id')
    .get(view)
    .patch(update)
    .put(update)
    .delete(remove);
// Export API routes
export default router;