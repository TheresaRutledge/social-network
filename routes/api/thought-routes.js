const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(addThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions/:reactionId')
.post(addReaction)
.delete(deleteReaction);

module.exports = router;