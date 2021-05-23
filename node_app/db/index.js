
const knex = require('knex')({
    client: 'mysql',
    debug: true,
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'tracker'
    }
});

export const initialiseDB = () => {
    knex.schema.hasTable('users').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('users', function (t) {
                t.increments('id').primary();
                t.string('first_name', 100).notNullable();
                t.string('last_name', 100).notNullable();
            });
        }
    });
    knex.schema.hasTable('sessions').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('sessions', function (t) {
                t.increments('id').primary();
                t.integer('user_id').unsigned().notNullable();
                t.string('name', 100).notNullable();
                t.timestamps();
                t.foreign('user_id').references('id').inTable('users');
            });
        }
    });
    knex.schema.hasTable('plans').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('plans', function (t) {
                t.increments('id').primary();
                t.integer('user_id').unsigned().notNullable();
                t.string('name', 100).notNullable();

                t.foreign('user_id').references('id').inTable('users');
            });
        }
    });
    knex.schema.hasTable('exercises').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('exercises', function (t) {
                t.increments('id').primary();
                t.string('name', 100).notNullable();
                t.integer('category_id').unsigned().notNullable();

                t.foreign('category_id').references('id').inTable('exercise_categories');
            });
        }
    });
    knex.schema.hasTable('exercise_categories').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('exercise_categories', function (t) {
                t.increments('id').primary();
                t.string('name', 100).notNullable();
            });
        }
    });
    knex.schema.hasTable('plan_exercises').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('plan_exercises', function (t) {
                t.increments('id').primary();
                t.integer('plan_id').unsigned().notNullable();
                t.integer('exercise_id').unsigned().notNullable();

                t.foreign('plan_id').references('id').inTable('plans');
                t.foreign('exercise_id').references('id').inTable('exercises');

            });
        }
    });
}

export default knex;