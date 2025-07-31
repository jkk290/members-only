const db = require('../storages/queries');

exports.msgListGet = async (req, res) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        const messages = await db.getAllMessages();
        res.render('messages', { 
            title: 'All Messages',
            messages: messages,
            isMember: req.user.membership,
            isAdmin: req.user.is_admin
        });
    };
};

exports.addMsgGet = (req, res) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        res.render('addMessage', {
            title: 'Add Message'
        });
    };
};

exports.addMsgPost = async (req, res) => {
    const message = {
        title: req.body.title,
        msg: req.body.msg,
        date: new Date(),
        author: req.user.id
    };
    console.log('Message to add: ', message);
    await db.addMsg(message);
    res.redirect('/messages');
};

exports.deleteMsgPost = async (req, res) => {
    const id = req.params.id;
    await db.deleteMsg(id);
    res.redirect('/messages');
};