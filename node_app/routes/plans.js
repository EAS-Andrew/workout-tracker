import DB from '../db'

export const addPlan = async (req, res) => {
    try {
        const [id] = await DB('plans').insert({
            ...req.body,
            user_id: req.params.user_id
        })
        res.json({ user: { id, ...req.body } })
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to create plan." })
    }
}


export const getPlans = async (req, res) => {
    try {
        if (req.params.plan_id) {
            const [plan] = await DB('plans')
                .where({ id: req.params.plan_id, user_id: req.params.user_id })
            const exercises = await DB('plan_exercises')
                .select('exercises.id', 'exercises.name', 'exercise_categories.name as category')
                .innerJoin('exercises', 'plan_exercises.exercise_id', 'exercises.id')
                .innerJoin('exercise_categories', 'exercises.category_id', 'exercise_categories.id')
                .where({ plan_id: req.params.plan_id })
            res.json({ plan: { ...plan, exercises } })
        } else {
            let plans = await DB('plans')
                .where({ user_id: req.params.user_id })
            plans = await Promise.all(plans.map(plan => new Promise(async (resolve, reject) => {
                const exercises = await DB('plan_exercises')
                    .select('exercises.*')
                    .innerJoin('exercises', 'plan_exercises.exercise_id', 'exercises.id')
                    .where({ plan_id: plan.id });
                resolve({ ...plan, exercises: exercises.length })
            })))
            res.json({ plans })
        }
    } catch (e) {
        console.log(e)
        res.json({ error: "Failed to get plan." })
    }
}


