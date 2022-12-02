const algoliasearch = require('algoliasearch');
const { Product, Tag } = require('./db/index');
const ALGOLIA_WRITE_KEY = process.env.ALGOLIA_WRITE_KEY;
const requestOptions = {
	timeouts: { connect: 2, read: 20 },
};
const client = algoliasearch('0STO802E4O', ALGOLIA_WRITE_KEY, requestOptions);
const index = client.initIndex('test_index');
async function algoliaSeed() {
	try {
		let prodList = await Product.findAll({ include: Tag });
		prodList = prodList.map((prod) => {
			prod.dataValues.objectID = prod.dataValues.id;
			return prod.dataValues;
		});
		const prod = await index.replaceAllObjects(prodList);
		console.log(`algolia seeded ${prod.objectIDs.length} items`);
	} catch (error) {
		console.log(error);
	}
}
algoliaSeed();
