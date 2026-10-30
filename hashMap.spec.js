// hashMap.test.js
import { HashMap } from './hashMap.js' 

describe('HashMap', () => {
  let map

  beforeEach(() => {
    map = new HashMap()
  })

  test('set and get', () => {
    map.set('apple', 'red')
    map.set('banana', 'yellow')

    expect(map.get('apple')).toBe('red')
    expect(map.get('banana')).toBe('yellow')
    expect(map.get('carrot')).toBe(undefined)
  })

  test('overwrite existing key', () => {
    map.set('apple', 'red')
    map.set('apple', 'green')

    expect(map.get('apple')).toBe('green')
    expect(map.length()).toBe(1)
  })

  test('has', () => {
    map.set('apple', 'red')

    expect(map.has('apple')).toBe(true)
    expect(map.has('banana')).toBe(false)
  })

  test('remove', () => {
    map.set('apple', 'red')
    map.set('banana', 'yellow')

    expect(map.remove('apple')).toBe(true)
    expect(map.has('apple')).toBe(false)
    expect(map.get('apple')).toBe(undefined)
    expect(map.length()).toBe(1)

    expect(map.remove('carrot')).toBe(false)
  })

  test('length', () => {
    expect(map.length()).toBe(0)

    map.set('a', 1)
    map.set('b', 2)
    map.set('c', 3)

    expect(map.length()).toBe(3)
  })

  test('clear', () => {
    map.set('apple', 'red')
    map.set('banana', 'yellow')
    map.clear()

    expect(map.length()).toBe(0)
    expect(map.get('apple')).toBe(undefined)
    expect(map.keys()).toEqual([])
  })

  test('keys, values, entries', () => {
    map.set('apple', 'red')
    map.set('banana', 'yellow')

    expect(map.keys().sort()).toEqual(['apple', 'banana'])
    expect(map.values().sort()).toEqual(['red', 'yellow'])

    const entries = map.entries().sort((a, b) => a[0].localeCompare(b[0]))
    expect(entries).toEqual([
      ['apple', 'red'],
      ['banana', 'yellow'],
    ])
  })

  test('grows when load factor exceeded', () => {
    for (let i = 0; i < 18; i++) {
      map.set(`key${i}`, i)
    }

    expect(map.length()).toBe(18)
    expect(map.get('key0')).toBe(0)
    expect(map.get('key12')).toBe(12)
  })
})