const { Enumerable } = require('./enumerable.js');

(async () => {

    // Contract address as parameter
    const enumerable = new Enumerable('0x20152506e44ba17f73dbf8fed08d23156a0344f9');

    const result1 = await enumerable.totalSupply();
    console.log(result1);

    const result2 = await enumerable.tokenOfOwnerByIndex('0x8bc5fe9f009ffd8d8c3f22dc7df73757ab0efbe2', 10);
    console.log(result2);

    const result3 = await enumerable.tokenByIndex(25);
    console.log(result3);

})()

