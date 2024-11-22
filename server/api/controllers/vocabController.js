const mongoose = require('mongoose'),
    Vocab = mongoose.model('Vocab')

exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words) => {
        if (err)
            res.send(err)
        res.json(words)
    })
}

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    newWord.save((err, words) =>{
        if (err)
            res.send(err)
        res.json(words)
    })
}

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, words) => {
        if (err)
            res.send(err)
        res.json(words)
    })
}

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate({_id: req.params.wordId},
        req.body,
        {new: true},
        (err, words) =>{
            if (err)
                res.send(err)
        res.json(words)
    })
}

exports.delete_a_word = (req, res) => {
    Vocab.remove({
        _id: req.params.wordId
    }, err => {
        if (err) res.send(err)
        res.json({
            message: 'Word successfully deleted',
            _id: req.params.wordId
        })
    })
}