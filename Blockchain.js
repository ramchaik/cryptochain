const Block = require('./Block');
const cryptohash = require('./Crypto-Hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });

    this.chain.push(newBlock);
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; ++i) {
      const { timestamp, lastHash, data, hash } = chain[i];

      const actualLastHash = chain[i - 1].hash;

      if (actualLastHash !== lastHash) return false;

      const validatedHash = cryptohash(timestamp, lastHash, data);

      if (validatedHash !== hash) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
