import DB from '../db'

export const addExercise = async (req, res) => {
    try {
        const [id] = await DB('exercises').insert({
            ...req.body
        })
        res.json({ user: { id, ...req.body } })
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to create exercise." })
    }
}


export const getExercises = async (req, res) => {
    try {
        const exercises = await DB
            .select('exercises.id', 'exercises.name', 'exercise_categories.name as category')
            .from('exercises')
            .join('exercise_categories', 'exercises.category_id', 'exercise_categories.id')
        res.json({ exercises })
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to get exercises." })
    }
}


