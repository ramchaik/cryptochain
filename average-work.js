const Blockchain = require('./Blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial' });

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; ++i) {
	prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

	blockchain.addBlock({ data: `Block: ${i}` });
	nextBlock = blockchain.chain[blockchain.chain.length - 1];
	nextTimestamp = nextBlock.timestamp;

	timeDiff = nextTimestamp - prevTimestamp;
	times.push(timeDiff);

	average = times.reduce((acc, val) => acc + val) / times.length;

	console.log(`Time to mine the block: ${timeDiff}. Difficulty: ${nextBlock.difficulty}. Average time: ${average}`);
}