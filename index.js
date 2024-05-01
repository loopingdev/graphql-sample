const { Enumerable } = require('./enumerable.js');

(async () => {

    // Contract address as parameter
    const enumerable = new Enumerable('0xd2c4fb77517bC8D1A9dA13dbEA0Bf4B8B29037dD');

    const result1 = await enumerable.totalSupply();
    console.log('\nenumerable.totalSupply()')
    console.log(result1);

    const result2 = await enumerable.tokenOfOwnerByIndex('0xE21098078a747E00b226CB9500efC3d8ED66FCdB', 210);
    console.log('\nenumerable.tokenOfOwnerByIndex(\'0xE21098078a747E00b226CB9500efC3d8ED66FCdB\', 210)')
    console.log(result2);

    const result3 = await enumerable.tokenByIndex(25);
    console.log('\nenumerable.tokenByIndex(25)')
    console.log(result3);

    const result4 = await enumerable.allTokens();
    console.log('\nenumerable.allTokens()')
    console.log(result4, result4.length);

})()

