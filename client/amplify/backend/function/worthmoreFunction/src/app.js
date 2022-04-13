/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Pool = require("pg").Pool;

// declare a new express app

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());

app.listen(5000, () => {
	console.log("server has started on port 5000");
});

//TODO: HIDE THIS!!!!
const pool = new Pool({
	user: "phoenix",
	host: "worthmoredb-instance.cydwbxxcizpw.us-east-1.rds.amazonaws.com",
	port: 5432,
	database: "worthmoreDB",
	password: "Swarthmore2025!?",
});

// Enable CORS for all methods
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

/**********************
 * Example get method *
 **********************/

app.get("/worthmoreAPI/items", async (req, res) => {
	try {
		//request allItems and allTags
		const allItems = await pool.query(
			"SELECT * FROM item ORDER BY date_added DESC"
		);
		const allTags = await pool.query(
			"SELECT DISTINCT i.id, it.tag_id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id"
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
		console.log("Success!");
	} catch (err) {
		console.log(err.message);
	}
});
app.get("/worthmoreAPI/items/filter", async (req, res) => {
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
			`SELECT DISTINCT i.id, it.tag_id, t.tag_name FROM item AS i JOIN item_tag AS it on it.item_id = i.id JOIN tag AS t ON t.id = it.tag_id`
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
		console.log("Success!");
	} catch (err) {
		console.log(err.message);
	}
});

/****************************
 * Example post method *
 ****************************/

app.post("/worthmoreAPI", function (req, res) {
	// Add your code here
	res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/worthmoreAPI/submit", async (req, res) => {
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

/****************************
 * Example put method *
 ****************************/

app.put("/worthmoreAPI", function (req, res) {
	// Add your code here
	res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/worthmoreAPI/*", function (req, res) {
	// Add your code here
	res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/worthmoreAPI", function (req, res) {
	// Add your code here
	res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/worthmoreAPI/*", function (req, res) {
	// Add your code here
	res.json({ success: "delete call succeed!", url: req.url });
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
