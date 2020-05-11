<template>
  <div>
    <!-- componentsについて
    Vueインスタンス内では別のVueインスタンスを使用することができる -->
    <!-- <h2>Child Component</h2> -->
    <h2>{{ title }}</h2>
    <!-- slotについて
    親側のコンポーネントから子のコンポーネントにhtmlを含む任意のコンテンツを差し込むことができる機能 -->
    <!-- フォールバックコンテンツについて
    slotのコンテンツ部分がないときの表示（デフォルトのコンテンツ）の指定をすることができる -->
    <!-- v-slotについて
    複数のスロットが必要だというケースがあると思います、そのような時にはv-slotディレクティブを使用する -->
    <slot name="head"></slot>
    <slot>default slot</slot>
    <slot name="foot"></slot>
  </div>
</template>


<script>
export default {
  // propsについて
  // 親コンポーネントのデータを子のコンポーネントに受け渡すことができる
  props: {
    title: {
      type: String,
    }
  }
}
</script>