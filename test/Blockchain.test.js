const Blockchain = require("../Blockchain.js");
const Block = require("../Block.js");

describe("Blockchain", () => {
	const blockchain = new Blockchain();
	 
	it("contains a `chain` Array instance", () => {
		expect(blockchain.chain instanceof Array).toBe(true);
	});

	it("starts with genesis block", () => {
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it("add a new block to chain", () => {
		const newData = "foo bar";
		blockchain.addBlock({ data: newData });
		
		expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
	})
})