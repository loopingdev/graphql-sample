
const { gql, ApolloClient, InMemoryCache } = require('@apollo/client/core');

class Enumerable {

    DEFAULT_SKIP = 1000;
    contract;
    client;

    constructor(contract) {
        this.contract = contract;
        this.client = new ApolloClient({
                uri: 'http://graph.vitruveo.xyz/subgraphs/name/tokens/erc721/',
                cache: new InMemoryCache(),
                defaultOptions: {
                  query: {
                    fetchPolicy: "cache-first"
                  }
                }
            });
    }

    async totalSupply() {
        let count = 0;
        let newCount = 0;
        let skip = 0;
        do {            
            const results = await this.client.query({
                        query: gql`
                            query allTokens {
                                erc721Tokens(
                                    where: {contract: "${this.contract}"}
                                    first: 1000
                                    skip: ${ skip }
                                ) {
                                    identifier
                                }
                        }`
                    });            
            newCount = results.data.erc721Tokens.length;
            count += newCount;
            skip += this.DEFAULT_SKIP;

        } while(newCount > 0);

        return(count);
    }

    async tokenOfOwnerByIndex(owner, index) {
       if (!owner || index < 1) {
        return null;
       } else {
            const results = await this.client.query({
                        query: gql`
                            query tokensByOwner {
                                erc721Tokens(
                                    where: {contract: "${this.contract}", owner: "${owner}"}
                                    first: 1
                                    skip: ${ index - 1}
                                ) {
                                    identifier
                                }
                        }`
                    });            
            return results.data.erc721Tokens.length > 0 ? Number(results.data.erc721Tokens[0].identifier) : null;
        }
    }

    async tokenByIndex(index) {
        if (index < 1) {
            return null;
           } else {
                const results = await this.client.query({
                            query: gql`
                                query tokensByOwner {
                                    erc721Tokens(
                                        where: {contract: "${this.contract}"}
                                        first: 1
                                        skip: ${ index - 1}
                                    ) {
                                        identifier
                                    }
                            }`
                        });            
                return results.data.erc721Tokens.length > 0 ? Number(results.data.erc721Tokens[0].identifier) : null;
            }    
    }


    async allTokens() {
        let count = 0;
        let newCount = 0;
        let skip = 0;
        let tokens = [];
        do {            
            const results = await this.client.query({
                        query: gql`
                            query allTokens {
                                erc721Tokens(
                                    where: {contract: "${this.contract}"}
                                    first: 1000
                                    skip: ${ skip }
                                ) {
                                    identifier
                                }
                        }`
                    });            
            newCount = results.data.erc721Tokens.length;
            results.data.erc721Tokens.forEach(t => tokens.push(Number(t.identifier)) )
            count += newCount;
            skip += this.DEFAULT_SKIP;

        } while(newCount > 0);

        return(tokens);
    }

}


module.exports = { Enumerable  }

