const { GENESIS_DATA } = require('./config.js');
const cryptoHash = require('./Crypto-Hash');

class Block {
  constructor({ timestamp, lastHash, data, hash }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.data = data;
    this.hash = hash;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = cryptoHash(timestamp, lastHash, data);

    return new this({
      timestamp,
      lastHash,
      data,
      hash
    });
  }
}

module.exports = Block;
