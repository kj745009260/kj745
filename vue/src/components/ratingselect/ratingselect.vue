<template>
   <div class="ratingselect">
       <div class="rating-type">
           <span class="block positive" :class="{'active': selectType2 === 2}" @click="select(2, $event)">{{ desc.all }}
              <span class="count">{{ ratings.length }}</span>
           </span>
           <span class="block positive" :class="{'active': selectType2 === 0}" @click="select(0, $event)">{{ desc.positive }}
              <span class="count">{{ positives.length }}</span>
           </span>
           <span class="block negative" :class="{'active': selectType2 === 1}" @click="select(1, $event)">{{ desc.negative }}
              <span class="count">{{ negatives.length }}</span>
           </span>
       </div>
       <div class="switch" @click="toggleContent" :class="{'on':onlyContent2}">
           <i class="icon-check_circle"></i>
           <span class="text">只看有内容的评价</span>
       </div>
   </div>
</template>

<script>

const POSITIVE = 0;
const NRGATIVE = 1;
const ALL = 2;

import Bus from 'common/js/EventBus.js';
export default{
    props:{
        desc: {
            type: Object,
            default(){
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        },
        selectType:{
            type: Number,
            default: ALL
        },
        ratings: {
            type: Array,
            default(){
                return []
            }
        },
        onlyContent: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            selectType2: this.selectType,
            onlyContent2: this.onlyContent
        }
    },
    methods:{
        select(type, event){
            if(!event._constructed) return;
            this.selectType2 = type;
            Bus.$emit('ratingtype.select', this.selectType2);
        },
        toggleContent(){
            if(!event._constructed) return;
            this.onlyContent2 = !this.onlyContent2;
            Bus.$emit('content.toggle', this.onlyContent2);
        }
    },
    computed:{
        positives(){
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            })
        },
        negatives(){
            return this.ratings.filter((rating) => {
                return rating.rateType === NRGATIVE;
            })
        }
    }
}
</script>

<style lang="scss" type="stylesheet/scss">
@import "../../common/css/mixins.scss";
.ratingselect{
    .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        @include border-1px(rgba(7, 17, 27, .1));
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            line-height: 16px;
            color: rgb(77, 85, 93);
            font-size: 12px;
            &.active {
                color: #fff;
            }
            &.positive {
                background: rgba(0, 160, 220, .2);
                &.active {
                    background: rgb(0, 160, 220);
                }
            }
            &.negative {
                background: rgba(77, 85, 93, .2);
                &.active {
                    background: rgb(77, 85, 93);
                }
            }
            .count {
                font-size: 8px;
                margin-left: 2px;
            }
        }
    }
    .switch{
        padding:12px 18px;
        line-height:24px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        color: rgb(147, 153, 159);
        font-size: 0;
        &.on{
            .icon-check_circle{
                color: #00c850;
            }
        }
        i {
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            margin-right: 4px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
}
</style>