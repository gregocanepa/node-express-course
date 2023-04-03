let { people } = require('../data.js');


const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}


const addPeople = (req, res) => {
    const {name} = req.body
    if (!name) {
        return res
        .status(400)
        .json({sucess: false, msg: 'Please provide a name value'})
    }
    res.status(201).json({'success': true, 'peopleName': name})
}

const updatePeople =  (req, res) =>{
    const {id} = req.params
    if (!id) {
        return res
        .status(400)
        .json({sucess: false, msg: 'Please provide an id'})
    }
    const {name} = req.body
    if (!name) {
        return res
        .status(400)
        .json({sucess: false, msg: 'Please provide a name value'})
    }
    const person = people.find(
        (person)=> person.id === Number(id)
    )
    person.name = name
    res.status(201).json({success: true, person: person})
}

const deletePeople = (req, res) => {
    const {id} = req.params
    if (!id) {
        return res
        .status(400)
        .json({sucess: false, msg: 'Please provide an id'})
    }
    const filteredPeople = people.filter(
        (person)=> (person.id !== Number(id))
    )
    console.log(people)
    res.status(200).json({sucess: true, data: filteredPeople})
}

module.exports = {getPeople, addPeople, updatePeople, deletePeople}
