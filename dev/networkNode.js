const port = process.argv[2];
const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const { json } = require('body-parser');

const app = express();
const bitcoin = new Blockchain();
const nodeAdress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function (req, res){
    res.send(bitcoin);
});

app.get('/transaction', function (req, res){
    res.send('It works with get!');
});

app.post('/transaction', function (req, res){
    console.log(req.body);
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

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
});

app.listen(port, function (){
    console.log(`listening on port ${port}...`);
});

app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
        bitcoin.networkNodes.push(newNodeUrl);
    
    const regNodesPromises = [];    
    bitcoin.networkNodes.forEach (networkNodeUrl => {

        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: {newNodeUrl: newNodeUrl},
            json: true
        };

        regNodesPromises.push(rp(requestOptions));
        //... '/register-node'
    });

    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
            json: true
        }

        return rp(bulkRegisterOptions);
    })

    .then (data => {
        res.json({note: 'New Node registered with network'});
    });
});

app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    
    if (nodeNotAlreadyPresent && notCurrentNode)
        bitcoin.networkNodes.push(newNodeUrl);
    
    res.json({note: 'New node registered successfully.'});
});

app.post('/register-nodes-bulk', function(req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    
    allNetworkNodes.forEach(networkNodeUrl => {
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);   
    });
    res.json({note: 'Bulk registration successful.'});
});

app.post('/transaction/broadcast', function(req, res) {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    bitcoin.addTransactionToPendingTransactions(newTransaction);
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        //...
        const requestOptions = {
           uri:  networkNodeUrl + '/transaction',
           method: 'POST',
           body: newTransaction,
           json: true 
        };
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)

    .then( data => {
        res.json({ note: 'Transaction created and broadcast successfully.'})
    });
});