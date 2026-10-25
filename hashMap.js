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
            for(let bucket of this.nodes[hashKey]) {
                if (bucket['key'] === key) {
                    bucket['key'] = value
                }
            }
        } else {
            this.nodes[hashKey].push({
                hashKey, 
                key, 
                value,
            })
        }

        if ()
    }

    get(key) {
        const hashKey = this.hash(key)
        let res

        if (this.nodes[hashKey].length !== 0) {
            for(let bucket of this.nodes[hashKey]) {
                if (bucket['key'] === key) {
                    res = bucket['value']
                }
            }
        }
        
        return res
    }

    has(key) {
        const hashKey = this.hash(key)

        for(let bucket of this.nodes[hashKey]) {
            if (bucket['key'] === key) {
                return true
            }
        }

        return false
    }

    remove(key) {
        const hashKey = this.hash(key)

        for(let i = 0; i < this.nodes[hashKey].length; i++) {
            if (this.nodes[hashKey][i]['key'] === key) {
                this.nodes[hashKey].shift(i)
                return true
            }
        }

        return false
    }

    length() {
        let cnt = 0

        for(let bucket of this.nodes) {
            for (let node of bucket) {
                cnt += 1
            }
        }

        return cnt
    }

    clear() {
        this.nodes = this.nodes = Array.from({ length: 16 }, () => [])
    }


    keys() {
        const res = []
        
        for(let bucket of this.nodes) {
            for (let node of bucket) {
                res.push(node['key'])
            }
        }

        return res
    }

    values() {
        const res = []
        
        for(let bucket of this.nodes) {
            for (let node of bucket) {
                res.push(node['value'])
            }
        }

        return res
    }

    entries() {
        const res = []
        
        for(let bucket of this.nodes) {
            for (let node of bucket) {
                res.push([node['key'], node['value']])
            }
        }

        return res
    }
}