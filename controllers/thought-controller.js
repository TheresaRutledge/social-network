
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err)
            )
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err)
            )
    },

    addThought({ body }, res) {
        Thought.create(body)
            .then(({_id})=> {
                return User.findOneAndUpdate(
                    {_id:body.userId},
                    {$push: {thoughts: _id} },
                    {new:true}
                );
            })
            .then(userData => {
                if(!userData){
                    res.status(404).json({message:'no user with that id'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));

    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));

    },

    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            {$push: {reactions:body}},
            { new: true}
        )
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with that id' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;