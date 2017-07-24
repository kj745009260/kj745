<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="content">
                            <h1 class="name">{{ rating.username }}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery">{{ rating.deliveryTime }}</span>
                            </div>
                            <p class="text">{{ rating.text }}</p>
                            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                                <i class="icon-thumb_up"></i>
                                <span v-for="item in rating.recommend" class="item">{{ item }}</span>
                            </div>
                            <div class="time">{{ rating.rateTime | formatDate }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import star from 'components/star/star.vue';
    import split from 'components/split/split.vue';
    import ratingselect from 'components/ratingselect/ratingselect.vue';
    import BScroll from 'better-scroll';
    import {formatDate} from 'common/js/date.js';
    import Bus from 'common/js/EventBus.js';

    const ALL = 2;
    const ERROR_OK = 0;

    export default {
        props:{
           seller:{
              type: Object
           }
        },
        data(){
           return {
              ratings: [],
              selectType: ALL,
              onlyContent: true
           }
        },
        components:{
            star,
            split,
            ratingselect
        },
        created(){
            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if(response.errno === ERROR_OK){
                    this.ratings = response.data;
                    this.$nextTick(() => {
                        this.BScroll = new BScroll(this.$refs.ratings, {
                            click: true
                        });
                    })
                }
            });

            Bus.$on('ratingtype.select', (selectType) => {
                this.selectType = selectType;
                this.$nextTick(() => {
                    this.BScroll.refresh();
                })
            });

            Bus.$on('content.toggle', (onlyContent) => {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.BScroll.refresh();
                })
            })
        },
        methods:{
            needShow(type, text){
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType === ALL){
                    return true;
                }else{
                    return this.selectType === type;
                }
            }
        },
        filters:{
            formatDate(time){
                let date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:ss");
            }
        }
    }
</script>

<style lang="scss" type="stylesheet/scss">
    @import '../../common/css/mixins.scss';
    .ratings{
        position: fixed;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, .1);
                text-align: center;
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .overview-right{
                flex: 1;
                padding: 6px 0 6px 24px;
                .score-wrapper{
                    margin-bottom: 8px;
                    .title{
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .star {
                        display: inline-block;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                    .score {
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                display: flex;
                padding: 18px 0;
                @include border-1px(rgba(7, 17, 27, .1));
                &:last-child{
                    @include border-none();
                }
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img {
                        border-radius: 50%;
                    }
                }
                .content {
                    flex: 1;
                    position: relative;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 6px;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up, .item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }
                        .item {
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, .1);
                            border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                            font-size: 9px;
                        }
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>