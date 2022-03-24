const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
	console.log("server has started on port 5000");
});

//get all items

app.get("/items", async (req, res) => {
	try {
		const allItems = await pool.query("SELECT * FROM item");
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/alphabetically", async (req, res) => {
	try {
		const allItems = await pool.query("SELECT * FROM item ORDER BY item_name");
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/latest", async (req, res) => {
	try {
		const allItems = await pool.query(
			"SELECT * FROM item ORDER BY date_added DESC"
		);
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/oldest", async (req, res) => {
	try {
		const allItems = await pool.query("SELECT * FROM item ORDER BY date_added");
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/search/:word", async (req, res) => {
	try {
		const { word } = req.params;
		const allItems = await pool.query(
			"SELECT * FROM item WHERE item_name ILIKE $1",
			["%" + word + "%"]
		);
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/filter", async (req, res) => {
	try {
		let sort;
		if (req.query.sort === "latest") sort = "date_added DESC";
		else if (req.query.sort === "oldest") sort = "date_added";
		else if (req.query.sort === "alphabetical") sort = "item_name";
		console.log("Search results");
		console.log(sort);
		console.log(req.query.search);
		const allItems = await pool.query(
			`SELECT * FROM item WHERE item_name ILIKE '%${req.query.search}%' ORDER BY ${sort}`
		);
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});
