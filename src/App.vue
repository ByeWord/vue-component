<template>
    <div id="app">
        <w-layout class="page">
            <w-header>Header</w-header>
            <w-layout>
                <w-sider>sider</w-sider>
                <w-content>content</w-content>
            </w-layout>
            <w-footer>footer</w-footer>
        </w-layout>
    </div>
</template>

<script>
  import WLayout from './components/layout/layout';
  import WHeader from './components/layout/header';
  import WSider from './components/layout/sider';
  import WContent from './components/layout/content';
  import WFooter from './components/layout/footer';

  export default {
    name: 'app',
    components: {
      WLayout,
      WHeader,
      WSider,
      WContent,
      WFooter
    }
  }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body,html{
        margin: 0;
        padding: 0;
    }
    .page{
        height: 100vh;
        width: 100vw;
    }
    .w-header{
        height: 64px;
        background-color: lightgreen;
    }
    .w-footer{
        height: 60px;
        background-color: lightseagreen;
    }
</style>
