<template>
  <div>
    <!-- v-htmlディレクティブについて
    HTMLとして出力できる -->
    <!-- v-bindディレクティブについて -->
    <!-- <h1
      v-html="message"
      v-bind:class="{ 'is-green': isGreen }"
    ></h1> -->
    <!-- v-bindの省略記法について -->
    <h1
      v-html="message"
      :class="classObject"
    ></h1>
    <p>{{ leads.description }}</p>
    <!-- dataの追加について -->
    <button
      @click="addDescription"
    >
      add description
    </button>
    <!-- オブジェクトの変更について -->
    <button @click="changeTextSize">large</button>
    <hr>
    <!-- v-showディレクティブについて
    式が真のときのみ要素を表示する -->
    <!-- v-slotについて
      複数のスロットが必要な場合 -->
    <!-- <child-component
      v-show="isShow"
    >
      <template v-slot:head>
        <p>head slot</p>
      </template>
      <template v-slot:default>
        <p>main slot</p>
        <p>main slot2</p>
      </template>
      <template v-slot:foot>
        <p>foot slot</p>
      </template>
    </child-component> -->
    <!-- v-slotの省略記法について -->
    <child-component
      v-if="isShow"
    >
      <template #head>
        <p>head slot</p>
      </template>
      <template #default>
        <p>main slot</p>
        <p>main slot2</p>
      </template>
      <template #foot>
        <p>foot slot</p>
      </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>
    <p v-if="id === 1">1</p>
    <!-- v-else-if,v-elseディレクティブについて
    複数の条件によって要素を出し分ける必要がでてきたときにv-ifディレクティブの直後の要素に指定できるv-else-if、v-elseディレクティブがある -->
    <!-- htmlとして出力したくない場合は<template>タグを使う -->
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>Other</p>
    <hr>
    <!-- v-forディレクティブについて
    配列やオブジェクトをループ処理してマークアップ部分の表示制御をする -->
    <article v-for="post in posts"
      :key="$uuid.v4()"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
    <hr>
    <!-- v-onディレクティブについて
    要素にイベントを付与することができる -->
    <!-- <button v-on:click="count++">Add to count</button> -->
    <!-- v-onディレクティブの省略記法について -->
    <!-- methodsについて
    Vueインスタンス内で使用したいメソッドを定義する際には、methods内に定義する -->
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックしました</p>
    <hr>
    <!-- v-modelディレクティブについて
    フォーム部品として使用するinputタグやselectタグのバインディングには、v-modelディレクティブを使用する -->
    <form>
      <div>
        <span>名前:</span>
        <!-- <input type="text"
          :value="form.name"
          @input="form.name = $event.target.value"
        > -->
        <input-text v-model="form.name"></input-text>
        <p>名前: {{ getInputName }}</p>
      </div>
      <div>
        <span>性別:</span>
        <label>
          男性
          <input type="radio" value="male" v-model="form.sex">
        </label>
        <label>
          女性
          <input type="radio" value="female" v-model="form.sex">
        </label>
        <p>性別: {{ getRadioValue }}</p>
      </div>
      <div>
        <select v-model="form.selected">
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.value }}
          </option>
        </select>
        <p>出身地:{{ getSelectValue }}</p>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="form.checked">
          20際以上です
        </label>
        <p>チェックボックス: {{ getCheckBoxValue }}</p>
      </div>
    </form>
    <hr>
    <counter
      :count="count"
      @increment="incrementCount"
    ></counter>
    <hr>
    <!-- computedについて
    依存しているリアクティブなプロパティに変更があった際に実行される -->
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <!-- methodsとの違いについて
    methodsは再描画が発生するたび関数を実行するが、computedは再描画が発生しても変更がなければ関数を実行しない -->
    <p>methods: {{ showUpperCaseText() }}</p>
    <hr>
    <template v-for="category in categories">
      <p :key="$uuid.v4()">
        {{ category }}
      </p>
    </template>
    <!-- dataの変更について -->
    <button @click="updateText">update text</button>
    <hr>
  </div>
</template>

<script>
import ChildComponent from 'Components/ChildComponent';
import Counter from 'Components/Counter';
import InputText from 'Components/InputText';
import axios from 'axios';

export default {
  beforeCreate() {
    console.log('beforeCreate');
    console.log(this.leads); //undefined
  },
  created() {
    console.log('created');
    console.log(this.posts);
    axios.get('/data.json').then(res => {
      this.posts = res.data.posts;
    });
  },
  beforeMount() {
    console.log("beforeMount");
    console.log(this.$el);//undefined
  },
  mounted() {
    console.log('mounted');
    console.log(this.$el);
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  //es6のメソッド記法
  // 「data」メソッドについて
  // Vueインスタンスが保持することができるプロパティを定義しておくことができるメソッド
  // ここで定義されるプロパティはリアクティブなプロパティ
  // リアクティブなプロパティが変更されたらVue.js側でビューの再描画を実行してくれる
  data() {
    return {
      leads: {
        message: '<span>Hello Vue</span>',
        description: '',
      },
      // Mustache構文について
      // 「Mustache構文」を使用することでdataや式をプレーンテキストとして展開することができる
      // ↓データとテンプレートの表示を同期させることをデータバインディング
      message: '<span>Hello Vue</span>',
      description: '',
      isShow: true,
      id: 2,
      count: 0,
      inputText: '',
      classObject: {
        'is-green': true,
      },
      items: [
          {
            id: this.$uuid.v4(),
            title: '1番目のリスト',
          },
          {
            id: this.$uuid.v4(),
            title: '２番目のリスト'
          },
          {
            id: this.$uuid.v4(),
            title: '3番目のリスト'
          }
      ],
      form: {
        name: '',
        sex: '',
        selected: '',
        options: [
          {
            id: this.$uuid.v4(),
            value: '東京都',
          },
          {
            id: this.$uuid.v4(),
            value: '埼玉県',
          },
          {
            id: this.$uuid.v4(),
            value: '神奈川県',
          },
          {
            id: this.$uuid.v4(),
            value: '千葉県',
          },
        ],
        checked: false,
      },
      categories: ['Javascript', 'jQuery'],
      posts: [],
    }
  },
  methods: {
    incrementCount(){
      this.count++;
    },
    showUpperCaseText() {
      const upperCaseText = this.inputText.toUpperCase();
      // console.log(`method: ${upperCaseText}`);
      return upperCaseText;
    },
    addDescription() {
      this.description = 'Vue-lesson';
      // console.log(this);
      // console.log(this.leads.description);
    },
    changeTextSize() {
      this.classObject = {...this.classObject, 'is-large': true};
    },
    toggleShow() {
      this.isShow = !this.isShow;
    },
    updateText() {
      this.categories.splice(1, 1, 'Vue.js');
    }
  },
  computed: {
    getUpperCaseText() {
      const upperCaseText = this.inputText.toUpperCase();
      // console.log(`computed: ${upperCaseText}`);
      return upperCaseText;
    },
    getInputName() {
      return this.form.name;
    },
    getRadioValue() {
      return this.form.sex;
    },
    getSelectValue() {
      return this.form.selected;
    },
    getCheckBoxValue() {
      return this.form.checked;
    }
  },
  // watchについて
  // Vue.jsにはdata内の値の変更を監視して、変更されたときに実行したい処理をwatch内に定義することができる
  watch: {
    inputText(value, oldValue) {
      console.log(`value -> ${value}`);
      console.log(`oldValue -> ${oldValue}`);
    },
    leads: {
      handler() {
        console.log('add description');
      },
      deep: true,
    }
  },
  components: {
    ChildComponent,
    Counter,
    InputText,
  }
}
</script>

<style scoped>
  .is-green {
    color: green;
  }

  .is-large {
    font-size: 48px;
  }

  hr {
    margin: 16px 0;
  }
</style>