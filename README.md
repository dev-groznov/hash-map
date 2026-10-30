# Custom HashMap & HashSet Data Structures (JavaScript)

An ES6 JavaScript implementation of **HashMap** and **HashSet** data structures featuring dynamic capacity resizing, collision handling via separate chaining, and a full unit test suite using Jest and Babel.

This project was built as part of [**The Odin Project's JavaScript HashMap Curriculum**](https://www.theodinproject.com/lessons/javascript-hashmap).

## 🚀 Features

* **Dynamic Resizing**: Automatically doubles the capacity when the current load factor exceeds `0.75` (default).
* **Collision Handling**: Uses separate chaining (buckets) to handle hash collisions smoothly.
* **Full API Implementation**: Includes all standard operations like `set`, `get`, `has`, `remove`, `length`, `clear`, `keys`, `values`, and `entries`.
* **Modern JavaScript**: Written with ES6 classes, private class fields (`#capacity`, `#loadFactor`, `#buckets`, etc.), and ES modules (`import`/`export`).
* **Comprehensive Test Suite**: Fully tested using **Jest** and **Babel**.

## 📂 Repository Structure

```
.
├── babel.config.json    # Babel configuration for ES module support in Jest
├── package.json         # Project setup and dependencies
├── hashMap.js           # HashMap class implementation
├── hashSet.js           # HashSet class implementation
├── hashMap.spec.js      # Jest tests for HashMap
└── hashSet.spec.js      # Jest tests for HashSet
```

## 📦 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:dev-groznov/hash-map.git
   cd hash-map
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## 🧪 Running Tests

To run the complete test suite with Jest:

```bash
npm test
```

## 📖 API Documentation

### 1. `HashMap`

Stores key-value pairs where keys are uniquely hashed.

| Method | Parameters | Description |
| ----- | ----- | ----- |
| `hash(key)` | `key` (string) | Takes a string key and returns a produced hash code modulo current capacity. |
| `set(key, value)` | `key` (string), `value` (any) | Assigns a value to a key. If the key exists, updates its value. Handles dynamic growth when load factor is exceeded. |
| `get(key)` | `key` (string) | Returns the value associated with the key, or `null` if not found. |
| `has(key)` | `key` (string) | Returns `true` if the key exists in the hash map, `false` otherwise. |
| `remove(key)` | `key` (string) | Removes the entry for `key` and returns `true`. Returns `false` if not found. |
| `length()` | *None* | Returns the total number of stored keys in the hash map. |
| `clear()` | *None* | Clears all entries from the hash map. |
| `keys()` | *None* | Returns an array containing all keys inside the hash map. |
| `values()` | *None* | Returns an array containing all values inside the hash map. |
| `entries()` | *None* | Returns an array containing all `[key, value]` pairs inside the hash map. |

#### `HashMap` Example Usage

```javascript
import { HashMap } from './hashMap.js';

const map = new HashMap();

map.set('name', 'Alice');
map.set('age', 25);

console.log(map.get('name')); // 'Alice'
console.log(map.has('age'));   // true

map.set('name', 'Bob');        // Overwrites 'Alice'
console.log(map.get('name')); // 'Bob'

map.remove('age');
console.log(map.length());     // 1
```

### 2. `HashSet`

Stores unique keys only (no duplicate values allowed).

| Method | Parameters | Description |
| ----- | ----- | ----- |
| `hash(key)` | `key` (string) | Produces a hash code for a given key string modulo current capacity. |
| `set(key)` | `key` (string) | Adds a unique key to the set. Resizes if load factor limit is hit. |
| `has(key)` | `key` (string) | Returns `true` if the key is present in the set, `false` otherwise. |
| `remove(key)` | `key` (string) | Removes the key from the set and returns `true` (or `false` if key did not exist). |
| `length()` | *None* | Returns the total count of keys stored in the set. |
| `clear()` | *None* | Removes all keys from the set. |
| `keys()` | *None* | Returns an array containing all keys in the set. |

#### `HashSet` Example Usage

```javascript
import { HashSet } from './hashSet.js';

const set = new HashSet();

set.set('apple');
set.set('banana');
set.set('apple'); // Duplicate ignored

console.log(set.has('apple')); // true
console.log(set.length());    // 2

set.remove('apple');
console.log(set.keys());      // ['banana']
```

## ⚙️ Configuration & Mechanics

* **Initial Capacity**: `16` buckets.
* **Load Factor**: `0.75`.
* **Dynamic Growth**: When `length / capacity > 0.75`, capacity doubles (`capacity * 2`), and all existing keys are re-hashed into the new buckets array.