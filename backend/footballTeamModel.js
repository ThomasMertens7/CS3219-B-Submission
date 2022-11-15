// footballTeamModel.js
import mongoose from 'mongoose';
// Setup schema
var footballTeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    bestPlayer: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export FootballTeam model
export default mongoose.model('footballTeam', footballTeamSchema);
