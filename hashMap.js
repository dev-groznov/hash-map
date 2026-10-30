export class HashMap {
    constructor() {
        this.loadFactor = 0.75
        this.capacity = 16
        this.nodes = Array.from({ length: 16 }, () => [])
        this.size = 0
    }

    #checkBounds(hashKey) {
        if (hashKey < 0 || hashKey >= this.nodes.capacity) {
            throw new Error("Trying to access hashKey out of bounds");
        }
    }

    #hash(key) {
        let hashCode = 0

        const primeNumber = 31
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i)
            hashCode &= (this.capacity - 1)
        }

        return hashCode;
    } 

    #resize() {
        this.capacity *= 2
        const newNodes = Array.from({ length: this.capacity }, () => [])

        for(let bucket of this.nodes) {
            for (let node of bucket) {
                const newHash = this.#hash(node.key)
                this.#checkBounds(newHash);

                newNodes[newHash].push({
                    'hashKey': newHash, 
                    'key': node.key, 
                    'value': node.value,
                })
            }
        }

        this.nodes = newNodes
    }

    set(key, value) {
        const hashKey = this.#hash(key)
        this.#checkBounds(hashKey);

        if (this.has(key)) {
            for(let bucket of this.nodes[hashKey]) {
                if (bucket['key'] === key) {
                    bucket['value'] = value
                }
            }
        } else {
            this.size += 1
            this.nodes[hashKey].push({
                hashKey, 
                key, 
                value,
            })
        }

        if (this.size > this.capacity * this.loadFactor) {
            this.#resize()
        }
    }

    get(key) {
        const hashKey = this.#hash(key)
        this.#checkBounds(hashKey);
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
        const hashKey = this.#hash(key)
        this.#checkBounds(hashKey);

        for(let bucket of this.nodes[hashKey]) {
            if (bucket['key'] === key) {
                return true
            }
        }

        return false
    }

    remove(key) {
        const hashKey = this.#hash(key)
        this.#checkBounds(hashKey);

        for(let i = 0; i < this.nodes[hashKey].length; i++) {
            if (this.nodes[hashKey][i]['key'] === key) {
                this.nodes[hashKey].splice(i, 1)
                this.size -= 1
                return true
            }
        }

        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.capacity = 16
        this.size = 0
        this.nodes = Array.from({ length: 16 }, () => [])
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