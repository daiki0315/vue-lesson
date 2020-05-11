<template>
  <div>
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックされました</p>
  </div>
</template>

<script>
export default {
  // emitについて
  // 子コンポーネントで発生したイベントを元に親のdataを変更したい場合使う
  props: {
    count: Number,
  },
  methods: {
    // incrementCount() {
    //   this.count++;
    // }
    incrementCount() {
      this.$emit('increment');
    }
  }
}
</script>