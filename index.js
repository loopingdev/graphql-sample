const { Enumerable } = require('./enumerable.js');

(async () => {

    // Contract address as parameter
    const enumerable = new Enumerable('0xd2c4fb77517bC8D1A9dA13dbEA0Bf4B8B29037dD');



   
    for (let i = 0; i < 10200; i++) {
        const token = await enumerable.tokenOfOwnerByIndex('0xE21098078a747E00b226CB9500efC3d8ED66FCdB', i);
      
        if (token !== null) {
            console.log(`Token at index ${i}: ${token}`);
        }
    }

})();
