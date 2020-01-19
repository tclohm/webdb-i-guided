const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		// res.json( await db.select("*").from("posts") );
		res.json( await db("posts").select() );
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		//const post = await db.select("*").from("posts").where("id", req.params.id);
		const post = await db("posts").where("id", req.params.id).first(); // return object not array
		res.json(post);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		};
		// INSERT INTO posts (title, content) VALUES (?, ?);
		const [id] = await db("posts").insert(payload);
		res.json( await db("posts").where("id", id).first() )
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		};
		// UPDATE posts SET title = ? AND contents = ? WHERE id = ?;
		await db("posts").where("id", req.params.id).update(payload)
		res.json(await db("posts").where("id", req.params.id).first());
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		// DELETE FROM posts WHERE id = ?
		await db("posts").where("id", req.params.id).del();
		//res.status(204).end();
		res.status(204).json({ message: "Deleted item" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;