import DB from '../db'

export const addUser = async (req, res) => {
    try {
        const [id] = await DB('users').insert({
            ...req.body
        })
        res.json({ user: { id, ...req.body } })
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to create user." })
    }
}


export const getUsers = async (req, res) => {
    try {
        if (req.params.user_id) {
            const [user] = await DB('users').where('id', req.params.user_id)
            res.json({ user })
        } else {
            const users = await DB.select('*').from('users')
            res.json({ users })
        }
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to get user." })
    }
}


