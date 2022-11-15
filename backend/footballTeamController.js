// footballTeamController.js
// Import footballTeam model
import FootballTeam from './footballTeamModel.js';
// Handle index actions
export async function index (req, res) {
        try {
            res.json({
                status: "success",
                message: "Teams retrieved successfully",
                data: await FootballTeam.find()
            });
        }
        catch (err) {
            res.json({
                status: "error",
                message: err,
            });
        }      
};
// Handle create footballTeam actions
export async function create (req, res) {
    var footballTeam = new FootballTeam();
    footballTeam.name = req.body.name;
    footballTeam.league = req.body.league;
    footballTeam.location = req.body.location;
    footballTeam.bestPlayer = req.body.bestPlayer;
// save the footballTeam and check for errors

    try {
        await footballTeam.save();
        res.json({
            message: 'New footballTeam created!',
            data: footballTeam
        });
    } catch (err) {
        res.json(err);
    }};
// Handle view footballTeam info
export async function view (req, res) {
    try {
        res.json({
            message: 'footballTeam details loading..',
            data: await FootballTeam.findById(req.params.footballTeam_id)
        });
    } catch (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
};

// Handle update footballTeam info
export async function update (req, res) {
    try {
            var footballTeam = await FootballTeam.findById(req.params.footballTeam_id)
            footballTeam.name = req.body.name ? req.body.name : footballTeam.name;
            footballTeam.league = req.body.league ? req.body.league : footballTeam.league;
            footballTeam.location = req.body.location ? req.body.location : footballTeam.location;
            footballTeam.bestPlayer = req.body.bestPlayer ? req.body.bestPlayer : footballTeam.bestPlayer;
// save the footballTeam and check for errors
            try {
                await footballTeam.save();
                res.json({
                    message: 'footballTeam Info updated',
                    data: footballTeam
                }); 
            } catch (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
    } catch (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
};
// Handle delete footballTeam
export async function remove (req, res) {
    try {
        await FootballTeam.remove({_id: req.params.footballTeam_id});
        res.json({
            status: "success",
            message: 'footballTeam deleted'
        });
    } catch (err) {
        res.send(err);
    }
};