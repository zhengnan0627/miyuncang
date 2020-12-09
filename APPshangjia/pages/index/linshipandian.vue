<template>
	<view class="container">
		<u-navbar  :title="`临时盘点`" :title-width="400" :background="{background: 'transparent'}" back-icon-color="#ffffff" title-color="#ffffff" :border-bottom="false"></u-navbar>
		<uni-search-bar bgColor="#ffffff" :radius="20" placeholder="选择盘点货架码"></uni-search-bar>
		<scroll-view
			@scroll="scroll2"
			scroll-y
			:scroll-top="scrollTop2"
			class="SCscroll-box"
			@scrolltolower="scrolltolower2"
			:style="{ height: height + 'px', top: top + 'px' }"
			>
		<template v-for="(item,index) in goodList">
			<view class="goodlist2" :key="index">
				<view class="goodlist2-title">
					货架号:&nbsp&nbspK01-02-03
				</view>
				<view class="list-content2" >
					<view class="content-img2" >
						<image :src="item.g_image" mode="aspectFit"></image>
					</view>
					<view class="content-text2">
						<view class="text-item2 text-name2"  @click="goodsdetail(item,index)">
							<text class="item-textclass">品名:&nbsp</text> {{item.g_name}}
						</view>
						<view class="text-item2 text-bianhao2 text-flex">
							<view class="">
								<text class="item-textclass">批号:&nbsp</text>&nbsp{{item.g_bianhao}}
							</view>
						</view>
						
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="item-textclass">规格:&nbsp</text>&nbsp{{item.g_guige}}
							</view>
						</view>
						<view class="text-item2 text-name2"  @click="goodsdetail(item,index)">
							<text class="item-textclass">效期:&nbsp</text> {{item.g_youxiaoqi}}
						</view>
						<view class="text-item2 text-factory2">
							<text class="item-textclass">生成厂商:&nbsp</text>&nbsp{{item.g_factory}}
						</view>
						<view class="text-item2 text-last"  @click="goodsdetail(item,index)">
							<text class="item-textclass">实盘数量:&nbsp</text> 
							<view class="last-num">
								{{item.g_kucun}}
							</view>
							<view class="last-confirm" @click="">
								盘点确认
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
			<!-- <u-empty  text="没有搜索结果" mode="search"  :show="goodList.length < 1"
					:marginTop="500"
			></u-empty> -->
			<u-back-top :scroll-top="old.scrollTop"  :top="1200" :bottom="200"></u-back-top>						
			<u-loadmore :status="status" v-if="goodList.length >= 10"/>	
		</scroll-view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'L101',
				list: [
					{
						name: '未盘'
					}, 
					{
						name: '已盘'
					}
				],
				current: 0,
				goodList:[
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
					{"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
				],
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore
				pageindex:1,//当前数据分页数
				total_page:null,//总分页数
				key:'',//搜索key
				scrollTop2: 0,//页面滚动高度
				height: 0, //scroll-view高度
				top: 0,
				old: { //官方解决抖动办法,记录就高度 二次传值
				   scrollTop:0,//商品列表右侧滚动高度
				},
			}
		},
		onLoad() {
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header =0;
						let top = 0;
						console.log(res);
						//#ifdef H5
						this.height = res.windowHeight - uni.upx2px(192);
						top = 44;
						//#endif
						//#ifdef APP-PLUS
						top = 44;
						this.height = res.windowHeight - uni.upx2px(192);
						//#endif
						this.top = top + uni.upx2px(header); 
					}
				});
			}, 50);
		},
		methods: {
			change(index) {
				this.current = index;
			},
			scroll2(e) {
				//动画时长固定300ms
			
					// this.scrollTop2 = e.detail.scrollTop;
					this.old.scrollTop = e.detail.scrollTop;//官方解决办法
			},
			//右侧滚动到底部方法
			scrolltolower2() {
				if(this.pageindex2 >= this.total_page2){
					this.status2 = 'nomore'
				}else{
					// console.log('到底了');
					this.status2 = 'loading';
					this.pageindex2 += 1;
				}	
			},
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100vw;
		height: 100vh;
		color: #FFFFFF;
	}
	/deep/ .uni-searchbar{
		background-color: transparent !important;
	}
	.goodlist2 {
		width: 100vw;
		margin: 4px 0;
		background-color: rgba($color: #ffffff, $alpha: 0.5);
	
	}
	.goodlist2-title{
		font-size: 20px;
		color: #000000;
		padding-left: 20px;
	}
	.list-content2 {
		width: 100vw;
		padding: 5px 5px;
		display: flex;
	}
	.content-img2 {
		position: relative;
		width: 30vw;
		margin-right: 10px;
		justify-content: center;
		vertical-align: middle;
		display: flex;
		align-items: center;
	}
	.content-img2 image {
		width: 100%;
		height: 100%;
	}
	.content-text2 {
		flex: 1;	
		font-size: 15px;
		color: #f4f4f4;
	}
	.text-item2 {
		width: 68vw;
		margin: 3px 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.item-textclass{
		display: inline-block;
		width: 60px;
		text-align: right;
		margin-right: 10rpx;
		color: #000000;
		
	}
	.text-guige2 {
		display: flex;
		justify-content: space-between;
		padding-right: 5px;
	}
	.text-flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.text-flex view{
		flex: 1;
	}
	.text-last{
		display: flex;
		align-items: center;
		.last-num{
			margin-left: 5px;
			padding: 3px 5px;
			background-color: #EEEEEE;
			color: #000000;
		}
		.last-confirm{
			margin-left: 20%;
			padding: 3px 7px;
			background-color: #007AFF;
			color: #FFFFFF;
		}
	}
</style>
