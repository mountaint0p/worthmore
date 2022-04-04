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
		//request allItems and allTags
		const allItems = await pool.query("SELECT * FROM item ORDER BY date_added");
		const allTags = await pool.query(
			"SELECT i.id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id"
		);
		//group tags by item id in taglist
		let tagList = {};
		allTags.rows.forEach((tag) => {
			if (!(tag.id in tagList)) {
				tagList[tag.id] = [tag.tag_name];
			} else {
				tagList[tag.id].push(tag.tag_name);
			}
		});
		//add tags to each item
		allItems.rows.forEach((item) => {
			if (item.id in tagList) {
				item.tags = tagList[item.id];
			} else item.tags = [];
		});
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.get("/items/filter", async (req, res) => {
	try {
		const searchTerm =
			typeof req.query.search !== "undefined" ? req.query.search : "";
		let tagQuery = "";
		if (typeof req.query.tags == "string") {
			tagQuery = `AND t.tag_name = '${req.query.tags}'`;
		} else if (Array.isArray(req.query.tags)) {
			tagQuery = `AND (t.tag_name = '${req.query.tags[0]}'`;
			for (let i = 1; i < req.query.tags.length; i++) {
				tagQuery += ` OR t.tag_name = '${req.query.tags[i]}'`;
			}
			tagQuery += ")";
		}
		let sort = "";
		if (req.query.sort === "latest") sort = "ORDER BY i.date_added DESC";
		else if (req.query.sort === "oldest") sort = "ORDER BY i.date_added";
		else if (req.query.sort === "alphabetical") sort = "ORDER BY i.item_name";
		const allItems = await pool.query(
			`SELECT DISTINCT(i.item_name), i.image_url, i.date_added, i.id, i.on_hold FROM item AS i 
			JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id
			WHERE item_name ILIKE '%${searchTerm}%' ${tagQuery} ${sort}`
		);
		const allTags = await pool.query(
			`SELECT i.id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id`
		);
		let tagList = {};
		allTags.rows.forEach((tag) => {
			if (!(tag.id in tagList)) {
				tagList[tag.id] = [tag.tag_name];
			} else {
				tagList[tag.id].push(tag.tag_name);
			}
		});
		//add tags to each item
		allItems.rows.forEach((item) => {
			if (item.id in tagList) {
				item.tags = tagList[item.id];
			} else item.tags = [];
		});
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});
