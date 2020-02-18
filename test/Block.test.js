const Block = require('../Block');
const { GENESIS_DATA } = require('../config');
const cryptoHash = require('../Crypto-Hash');

describe('Block', () => {
  const timestamp = 'a-date',
    lastHash = 'foo-hash',
    hash = 'bar-hash',
    nonce = 1,
    difficulty = 1,
    data = ['blockchain', 'data'];

  const block = new Block({
    timestamp,
    lastHash,
    hash,
    nonce,
    difficulty,
    data
  });

  it('has a timestamp, lastHash, hash, data', () => {
    expect(block).toEqual({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    });
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('Should return Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets the `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it('creates a SHA-256 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.lastHash,
          minedBlock.nonce,
          minedBlock.difficulty,
          minedBlock.data
        )
      );
    });

    it('sets a `hash` that matches the difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      );
    });
  });
});
