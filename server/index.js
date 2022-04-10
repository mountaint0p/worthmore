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
		const allItems = await pool.query(
			"SELECT * FROM item ORDER BY date_added DESC"
		);
		const allTags = await pool.query(
			"SELECT i.id, it.tag_id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id"
		);
		//group tags by item id in taglist
		let tagList = {};
		let tagIDList = {};
		allTags.rows.forEach((tag) => {
			if (!(tag.id in tagList)) {
				tagList[tag.id] = [tag.tag_name];
				tagIDList[tag.id] = [tag.tag_id];
			} else {
				tagList[tag.id].push(tag.tag_name);
				tagIDList[tag.id].push(tag.tag_id);
			}
		});
		//add tags to each item
		allItems.rows.forEach((item) => {
			if (item.id in tagList) {
				item.tags = tagList[item.id];
				item.tagIDs = tagIDList[item.id];
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
			`SELECT i.id, it.tag_id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id`
		);
		let tagList = {};
		let tagIDList = {};
		allTags.rows.forEach((tag) => {
			if (!(tag.id in tagList)) {
				tagList[tag.id] = [tag.tag_name];
				tagIDList[tag.id] = [tag.tag_id];
			} else {
				tagList[tag.id].push(tag.tag_name);
				tagIDList[tag.id].push(tag.tag_id);
			}
		});
		//add tags to each item
		allItems.rows.forEach((item) => {
			if (item.id in tagList) {
				item.tags = tagList[item.id];
				item.tagIDs = tagIDList[item.id];
			} else item.tags = [];
		});
		res.json(allItems.rows);
	} catch (err) {
		console.log(err.message);
	}
});

app.post("/submit", async (req, res) => {
	try {
		const params = req.body;
		const title = params.title;
		const imageURL = params.imageURL;
		let tags = " ";
		let i;
		for (i = 0; i < params.tags.length - 1; i++) {
			tags += ` '${params.tags[i]}', `;
		}
		tags += ` '${params.tags[i]}'`;
		console.log(tags);
		await pool.query(
			`INSERT INTO item (item_name, image_url) VALUES ('${title}', '${imageURL}')`
		);
		//All entries should have unique imageURL, but just in case we select for just one
		const id = await pool.query(
			`SELECT id FROM item WHERE item_name = '${title}' AND image_url = '${imageURL}' ORDER BY date_added LIMIT 1`
		);
		//Find tag ids based on tags given
		//TODO: Create a table on server to look up IDs instead of server query?
		const tagIDs = await pool.query(
			`SELECT id FROM tag WHERE tag_name in (${tags})`
		);
		console.log(id.rows[0].id);
		tagIDs.rows.forEach(async (tagID) => {
			temp = await pool.query(
				`INSERT INTO item_tag (item_id, tag_id) VALUES ('${id.rows[0].id}', '${tagID.id}')`
			);
		});
		res.json([]);
	} catch (err) {
		console.log(err.message);
	}
});
