const router = require('express').Router();
const{
    getAllUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

router
.route('/')
.get(getAllUsers)
.post(addNewUser);

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;