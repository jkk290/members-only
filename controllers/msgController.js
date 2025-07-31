const db = require('../storages/queries');

exports.msgListGet = async (req, res) => {
    const messages = await db.getAllMessages();
    res.render('messages', { 
        title: 'All Messages',
        messages: messages,
        isMember: req.user.membership 
    });
};

exports.addMsgGet = (req, res) => {
    res.render('addMessage', {
        title: 'Add Message'
    });
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