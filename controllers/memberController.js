const db = require('../storages/queries');
const bcrypt = require('bcryptjs');

exports.enrollMemberGet = (req, res) => {
    res.render('memberEnroll', {
        title: 'Member Enrollment'
    });
};

exports.enrollMemberPost = async (req, res) => {
    const membershipPw = await db.getMembershipPw();
    const submittedPw = req.body.memberPassword;
    const match = await bcrypt.compare(submittedPw, membershipPw.password);

    if (match) {
        await db.activateMembership(req.user.id);
        res.redirect('/messages');
    } else {
        res.redirect('/members/enroll');
    }
};