import { addUser, getUsers } from './users'
import { addPlan, getPlans } from './plans'
import { addExercise, getExercises } from './exercises'

export default app => {

    // users
    app.post('/api/users', addUser)
    app.get('/api/users', getUsers)
    app.get('/api/users/:user_id', getUsers)

    // plans
    app.post('/api/users/:user_id/plans', addPlan)
    app.get('/api/users/:user_id/plans', getPlans)
    app.get('/api/users/:user_id/plans/:plan_id', getPlans)

    // exercises
    app.post('/api/exercises', addExercise)
    app.get('/api/exercises', getExercises)


}