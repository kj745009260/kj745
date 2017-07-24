<template>
    <div class="goods">
       <div class="menu-wrapper" ref="menuWrapper">
           <ul>
               <li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex === index}" @click="selectMenu(index,$event)">
                   <span class="text">
                       <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
                   </span>
               </li>
           </ul>
       </div>
       <div class="foods-wrapper" ref="foodsWrapper">
           <ul>
               <li class="food-list food-list-hook" v-for="item in goods">
                   <h1 class="title">{{item.name}}</h1>
                   <ul>
                       <li class="food-item" v-for="food in item.foods" @click="selectedfood(food, $event)">
                            <div class="icon">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <div class="desc">{{food.description}}</div>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                       </li>
                   </ul>
               </li>
           </ul>
       </div>
       <shopcart ref="shopcart" :selectfoods="selectfoods" :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
       <food ref="food" :food="selectfood"></food>
   </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart.vue';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    import food from 'components/food/food.vue';
    import EventBus from 'common/js/EventBus.js';
    const ERR_OK = 0;
    export default {
        name: 'goods',
        props: {
            seller: {
               type: Object
            }
        },
        data(){
            return {
                classMap:['decrease','discount','special','invoice','guarantee'],
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectfood:{}
            }
        },
        computed:{
            currentIndex(){
                for(let i=0; i<this.listHeight.length; i++){
                    let h1 = this.listHeight[i];
                    let h2 = this.listHeight[i+1];
                    if(!h2 || (this.scrollY >= h1 && this.scrollY < h2)){
                        return i;
                    }
                }
                return 0;
            },
            selectfoods(){
                let foodsArr = [];
                this.goods.forEach((item) => {
                    item.foods.forEach((itemlist) => {
                        if(itemlist.count){
                           foodsArr.push(itemlist);
                        }
                    });
                });
                return foodsArr;
            }
        },
        created(){
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if(response.errno === ERR_OK){
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    })
                }
            })

            EventBus.$on('cart.add', el => {
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(el);
                })
            })
        },
        components:{
            shopcart,
            cartcontrol,
            food
        },
        methods:{
            selectMenu(index,event){
                if(!event._constructed){
                   return;
                }
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let element = foodList[index];
                this.foodScroll.scrollToElement(element,50);
            },
            _initScroll (){
                this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
                    click: true,
                    probeType: 3
                });
                this.foodScroll.on('scroll',(pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight(){
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height);
                for(let i=0; i<foodList.length; i++){
                    height += foodList[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectedfood(food, event){
                if(!event._constructed) return;
                this.selectfood = food;
                this.$refs.food.show();
            }
        }
    }
</script>

<style lang="scss" style="stylesheet/scss">
@import '../../common/css/mixins.scss';
.goods{
   display:flex;
   position:absolute;
   top:174px;
   bottom:46px;
   width:100%;
   overflow:hidden;
   .menu-wrapper{
      width:80px;
      flex:0 0 80px;
      background: #f3f5f7;
      .menu-item{
         display: table;
         height: 54px;
         width: 56px;
         line-height: 14px;
         padding: 0 12px;
         &:last-child{
            .text{
               @include border-none();
            }
         }
         &.current{
            position: relative;
            margin-top: -1px;
            z-index: 10;
            background: #fff;
            font-weight: 700;
            .text {
                @include border-none();
            }
         }
         .icon{
             display: inline-block;
             vertical-align: top;
             width: 12px;
             height: 12px;
             margin-right: 2px;
             background-size: 12px 12px;
             background-repeat: no-repeat;
             &.decrease {
                @include bg-image('img/decrease_3');
             }
             &.discount {
                @include bg-image('img/discount_3');
             }
             &.guarantee {
                @include bg-image('img/guarantee_3');
             }
             &.invoice {
                @include bg-image('img/invoice_3');
             }
             &.special {
                @include bg-image('img/special_3');
             }
         }
         .text{
             display: table-cell;
             width: 56px;
             vertical-align: middle;
             font-size: 12px;
             @include border-1px(rgba(7, 17, 27, .1));
         }
      }
   }
   .foods-wrapper {
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px(rgba(7, 17, 27, .1));
            &:last-child {
                @include border-none();
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    margin: 2px 0 8px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc,
                .extra {
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .extra {
                    line-height: 10px;
                    .count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>