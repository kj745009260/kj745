<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <div class="tab-item">
           <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
           <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
           <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/header/header';

const AjaxResponse = 0;
export default {
  name: 'app',
  data (){
     return {
         seller: {}
     }
  },
  created (){
     this.$http.get('/api/seller').then((response) => {
         response = response.body;
         if(response.errno === AjaxResponse){
            this.seller = response.data;
         }
     })
  },
  components: {
    'v-header':header
  }
}
</script>

<style lang="scss" style="stylesheet/scss">
@import "./common/css/mixins.scss";
.tab{
     display:flex;
     line-height:40px;
     width:100%;
     @include border-1px(rgba(7,17,27,0.1));
     .tab-item {
        flex:1;
        text-align:center;
        a {
          display:block;
          font-size:1rem;
          color:rgb(77,85,93);
          &.active {
            color:rgb(240,20,20);
          }
        }
     }
  }

</style>
