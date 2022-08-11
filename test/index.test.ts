import { describe, expect, test } from 'vitest'
import { defaultAttributes, extractorAttributify } from '../src/core'

describe('attributify', () => {
  const fixture1 = `
  <view >
    <button
      h-80 text-center flex flex-col align-center select-none all:transition-400
      bg="blue-400 hover:blue-400 dark:!blue-400 dark:hover:blue-400"
      li-bg="blue-500 hover:blue-500 dark:!blue-500 dark:hover:blue-500"
      class="text-red font-bold"
      :loading="loading"
      my-class="text-red font-bold"
      title="this is title"
      my-prop
      non-value
      :class="{ 'text-blue': true, 'text-green': false }"
      :class="[ 'text-blue', 'text-green' ]"
      :class="[ str === 'blue' ? 'text-blue' : 'text-red' ]"
    >
      Button
    </button>

    <button 
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      my-attr="y-1 x-2 sm"
    >
      Button
    </button>

    <button 
      text="sm white"
      font="mono light"
      p="y-2 x-4"
    >
      Button
    </button>

    <button border="~ red">
      Button
    </button>

    <button flex="~ col wrap">
      Button
    </button>

    <a text="red" un-text="blue">This conflicts with links' text prop</a>

    <button 
      bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      border="2 rounded blue-200"
    >
      Button
    </button>

    <button 
      bg="#333 grey-200 [#444]/40 red/50"
    >
      Button
    </button>

    <image mode="widthFix"></image> 
  </view>
`

  const fixture2 = `
<template>
  <div h-80 text-center flex flex-col align-center select-none all:transition-400>
    <input type="checkbox" peer mt-a>
    <div mb-a group peer-checked="text-4xl">
      <div
        font-100 text-4xl mb--3 p-10
        bg-gradient="to-r from-yellow-400 via-red-500 to-pink-500"
      >
        ~
      </div>
      <div text-5xl font-100 sm="bg-blue-600">
        unocss
      </div>
      <div op-20 font-200 mt-1 tracking-wider group-hover="text-teal-400 op-50">
        Re-imaging Atomic CSS
      </div>
    </div>
  </div>
  <div flex>
    <div ma inline-flex relative h-14>
      <input type="text" m-0 pt-4 px-4 text-true-gray-800 peer 
      placeholder="unocss" 
      un-placeholder="text-red">
      <label absolute leading-1rem left-4 pointer-events-none text-gray-7 top="1/3" transition="200 linear"
        peer-not-placeholder-shown="-translate-y-4 scale-75 origin-top-left text-green-500"
        peer-focus="-translate-y-4 scale-75 origin-top-left text-green-500"
        before="content-!"
        after="content-[!]"
      >Experience now</label>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style></style>
`

  const extract1 = extractorAttributify({
    attributes: [
      ...defaultAttributes,
      'my-attr',
    ],
  })
  const extract2 = extractorAttributify({
    prefixedOnly: true,
    prefix: 'un-',
  })

  const extract3 = extractorAttributify({
    nonValuedAttribute: true,
    ignoreNonValuedAttributes: ['h-80', 'flex', 'my-prop'],
  })

  const extract4 = extractorAttributify({
    nonValuedAttribute: true,
  })

  test('extract1', async () => {
    expect(extract1(fixture1)).toMatchSnapshot()
    expect(extract1(fixture2)).toMatchSnapshot()
  })

  test('extract2', async () => {
    expect(extract2(fixture1)).toMatchSnapshot()
    expect(extract2(fixture2)).toMatchSnapshot()
  })

  test('extract3', async () => {
    expect(extract3(fixture1)).toMatchSnapshot()
    expect(extract3(fixture2)).toMatchSnapshot()
  })

  test('extract4', async () => {
    expect(extract4(fixture1)).toMatchSnapshot()
    expect(extract4(fixture2)).toMatchSnapshot()
  })
})
