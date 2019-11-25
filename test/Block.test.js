const Block = require("../Block");
const { GENESIS_DATA } = require("../config");

describe("Block", () => {
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

  it("has a timestamp, lastHash, hash, data", () => {
    expect(block).toEqual({ timestamp, lastHash, hash, data });
  });

  describe("genesis()", () => {
	const genesisBlock = Block.genesis();
	
    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });
});
