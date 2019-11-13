const Block = require('../Block');

describe('Block', () => {
	const timestamp = "a-date",
		lastHash = "foo-hash",
		hash = "bar-hash",
		data = ["blockchain", "data"];

	const block = new Block({
		timestamp,
		lastHash,
		hash,
		data
	});

	it('has a timestamp, lastHash, hash, data', () => {
		expect(block).toEqual({ timestamp, lastHash, hash, data });
	});
});