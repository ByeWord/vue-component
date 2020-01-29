<template>
    <div id="app">
        <div class="btn-demo">
            <div class="basic-btn basic-btn-demo">
                <w-button>默认按钮</w-button>
                <w-button type="primary">主要按钮</w-button>
                <w-button type="danger">危险按钮</w-button>
                <w-button type="warning">警告按钮</w-button>
                <w-button type="success">成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button>朴素按钮</w-button>
                <w-button type="primary" plain>主要按钮</w-button>
                <w-button type="danger" plain>危险按钮</w-button>
                <w-button type="warning" plain>警告按钮</w-button>
                <w-button type="success" plain>成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button round>圆角按钮</w-button>
                <w-button type="primary" round>主要按钮</w-button>
                <w-button type="danger" round>危险按钮</w-button>
                <w-button type="warning" round>警告按钮</w-button>
                <w-button type="success" round>成功按钮</w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button icon="search" circle></w-button>
                <w-button type="primary" icon="search" circle></w-button>
                <w-button type="danger" icon="search" circle></w-button>
                <w-button type="warning" icon="search" circle></w-button>
                <w-button type="success" icon="search" circle></w-button>
            </div>
            <div class="plain-btn basic-btn-demo">
                <w-button button-disabled>禁止按钮</w-button>
                <w-button type="primary" button-disabled>主要按钮</w-button>
                <w-button type="danger" button-disabled>危险按钮</w-button>
                <w-button type="warning" button-disabled>警告按钮</w-button>
                <w-button type="success" button-disabled>成功按钮</w-button>
            </div>
            <div class="basic-btn basic-btn-demo">
                <w-button icon="search">默认按钮</w-button>
                <w-button type="primary" icon="search">主要按钮</w-button>
                <w-button type="danger" icon="search">危险按钮</w-button>
                <w-button type="warning" icon="search">警告按钮</w-button>
                <w-button type="success" icon="search">成功按钮</w-button>
            </div>
            <div class="basic-btn basic-btn-demo">
                <w-button>默认按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="primary">主要按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="danger">危险按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="warning">警告按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
                <w-button type="success">成功按钮
                    <w-icon name="search" class="w-icon--right"></w-icon>
                </w-button>
            </div>
        </div>
    </div>
</template>

<script>
  import WIcon from "./components/icon/src/icon";
  import WButton from "./components/button/src/button";

  export default {
    name: 'app',
    components: {WIcon, WButton},
  }
</script>

<style lang="scss">
    #app {
        padding: 20px;
    }

    .btn-demo {
        display: flex;
        flex-direction: column;
        width: 800px;
        margin: 0 auto;
        border: 1px solid #cccccc;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
        padding: 20px;
    }

    .basic-btn-demo {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
</style>
