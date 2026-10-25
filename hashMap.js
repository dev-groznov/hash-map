export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.nodes = Array.from({ length: 16 }, () => [])
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i)
            hashCode %= this.capacity
        }

        return hashCode;
    } 

    set(key, value) {
        const hashKey = this.hash(key)
        if (this.nodes[hashKey].length !== 0) {
            for(let item of this.nodes[hashKey]) {
                if (item['key'] === key) {
                    item['key'] = value
                }
            }
        } else {
            this.nodes[hashKey].push({
                hashKey, 
                key, 
                value,
            })
        }
    }

    get(key) {
        const hashKey = this.hash(key)
        let res

        if (this.nodes[hashKey].length !== 0) {
            for(let item of this.nodes[hashKey]) {
                if (item['key'] === key) {
                    res = item['value']
                }
            }
        }
        
        return res
    }
}