const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1649151910294,
    "transactions": [],
    "nonce": 10,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1649151928992,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1649152008346,
    "transactions": [
    {
    "amount": 6.125,
    "sender": "00",
    "recipient": "15713360b4c511ec82f7ad219064d92d",
    "transactionId": "20995740b4c511ec82f7ad219064d92d"
    },
    {
    "amount": 1,
    "sender": "sofia",
    "recipient": "jorge",
    "transactionId": "49c66ae0b4c511ec82f7ad219064d92d"
    }
    ],
    "nonce": 23182,
    "hash": "0000c36b6a0c29649c928001c4b480f4673e1c6fbc9af6b3b2e75aa34c66f504",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1649152076858,
    "transactions": [
    {
    "amount": 6.125,
    "sender": "00",
    "recipient": "15713360b4c511ec82f7ad219064d92d",
    "transactionId": "4fe30dc0b4c511ec82f7ad219064d92d"
    },
    {
    "amount": 1,
    "sender": "sofia",
    "recipient": "jorge",
    "transactionId": "73ab0eb0b4c511ec82f7ad219064d92d"
    },
    {
    "amount": 1,
    "sender": "sofia",
    "recipient": "jorge",
    "transactionId": "7457c970b4c511ec82f7ad219064d92d"
    }
    ],
    "nonce": 20305,
    "hash": "0000adcdb9e0dff7dca8fd1b2180b49afa8fead0e657c9af52ddd9c7ca622e91",
    "previousBlockHash": "0000c36b6a0c29649c928001c4b480f4673e1c6fbc9af6b3b2e75aa34c66f504"
    },
    {
    "index": 5,
    "timestamp": 1649152119925,
    "transactions": [
    {
    "amount": 6.125,
    "sender": "00",
    "recipient": "15713360b4c511ec82f7ad219064d92d",
    "transactionId": "78b927c0b4c511ec82f7ad219064d92d"
    }
    ],
    "nonce": 45749,
    "hash": "00004f631529879da8a5f2cad05e4513039035525fe989a636bc04b0ebb08f41",
    "previousBlockHash": "0000adcdb9e0dff7dca8fd1b2180b49afa8fead0e657c9af52ddd9c7ca622e91"
    },
    {
    "index": 6,
    "timestamp": 1649152122508,
    "transactions": [
    {
    "amount": 6.125,
    "sender": "00",
    "recipient": "15713360b4c511ec82f7ad219064d92d",
    "transactionId": "92648160b4c511ec82f7ad219064d92d"
    }
    ],
    "nonce": 45861,
    "hash": "0000f941017270306c90169c00ed0c2e4e1f1ea9fb34516a02d0e2268a06e0cd",
    "previousBlockHash": "00004f631529879da8a5f2cad05e4513039035525fe989a636bc04b0ebb08f41"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 6.125,
    "sender": "00",
    "recipient": "15713360b4c511ec82f7ad219064d92d",
    "transactionId": "93eecae0b4c511ec82f7ad219064d92d"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

    console.log('VALID:', bitcoin.chainIsValid(bc1.chain))