import { HashSet } from './hashSet.js'  

describe('HashSet', () => {
  let set

  beforeEach(() => {
    set = new HashSet()
  })

  test('set and has', () => {
    set.set('apple')
    set.set('banana')

    expect(set.has('apple')).toBe(true)
    expect(set.has('banana')).toBe(true)
    expect(set.has('carrot')).toBe(false)
  })

  test('no duplicates', () => {
    set.set('apple')
    set.set('apple')
    set.set('apple')

    expect(set.length()).toBe(1)
    expect(set.has('apple')).toBe(true)
  })

  test('remove', () => {
    set.set('apple')
    set.set('banana')

    expect(set.remove('apple')).toBe(true)
    expect(set.has('apple')).toBe(false)
    expect(set.length()).toBe(1)

    expect(set.remove('carrot')).toBe(false)
  })

  test('length', () => {
    expect(set.length()).toBe(0)

    set.set('a')
    set.set('b')
    set.set('c')

    expect(set.length()).toBe(3)
  })

  test('clear', () => {
    set.set('apple')
    set.set('banana')
    set.clear()

    expect(set.length()).toBe(0)
    expect(set.has('apple')).toBe(false)
    expect(set.keys()).toEqual([])
  })

  test('keys', () => {
    set.set('apple')
    set.set('banana')
    set.set('carrot')

    expect(set.keys().sort()).toEqual(['apple', 'banana', 'carrot'])
  })

  test('grows when load factor exceeded', () => {
    for (let i = 0; i < 18; i++) {
      set.set(`key${i}`)
    }

    expect(set.length()).toBe(18)
    expect(set.has('key0')).toBe(true)
    expect(set.has('key12')).toBe(true)
  })
})