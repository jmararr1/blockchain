const port = process.argv[2];
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');

const app = express();
const bitcoin = new Blockchain();
const nodeAdress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function (req, res){
    res.send(bitcoin);
    }
);

app.get('/transaction', function (req, res){
    res.send('It works with get!');
    }
);

app.post('/transaction', function (req, res){
    console.log(req.body);
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
    }
);

app.get('/mine', function (req, res){
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index']+1
    }

    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
    
    res.json(
        {
        note: "New block mined succesfully",
        block: newBlock
        }
    );
    
    bitcoin.createNewTransaction(6.125, "00", nodeAdress);
    }
);

app.listen(port, function (){
    console.log(`listening on port ${port}...`);
    }
);