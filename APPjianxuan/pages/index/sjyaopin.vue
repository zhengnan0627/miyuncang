<template>
	<view class="container">
		<!-- <view class="navbar">
			<u-icon name="arrow-left" @click="back"></u-icon>
			<view class="navbar-title"><text style="margin-left: -40rpx;">上架药品详情</text></view>
		</view> -->
		<u-navbar  title="上架药品列表" :background="{background: 'transparent'}" back-icon-color="#ffffff" title-color="#ffffff" :border-bottom="false"></u-navbar>
		<uni-search-bar bgColor="#ffffff" :radius="20"></uni-search-bar>
		<u-tabs :list="list" :current="current" @change="change" bgColor="transparent"></u-tabs>
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
				<view class="list-content2" >
					<view class="content-img2" >
						<image :src="item.g_image" mode="aspectFit"></image>
						<view class="kucun2" >
							{{item.kx_count * 1 < item.warning_count * 1? '库存紧张' : ''}}
						</view>
					</view>
					<view class="content-text2">
						<view class="text-item2 text-name2" style="font-size: 15px; color: #000000;" @click="goodsdetail(item,index)">
							品名:&nbsp{{item.g_name}}
						</view>
						<view class="text-item2 text-bianhao2 text-flex">
							<view class="">
								批号:&nbsp{{item.g_bianhao}}
							</view>
							<view class="">
								库存:&nbsp{{item.g_kucun}}
							</view>
						</view>
						
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								规格:&nbsp{{item.g_guige}}
							</view>
							<view class="">
								效期:&nbsp{{item.g_youxiaoqi}}
							</view>
						</view>
						<view class="text-item2 text-factory2">
							厂家:&nbsp{{item.g_factory}}
						</view>
						<view class="text-item2 text-factory2">
							
							<view class="text-shangjia" @click="Toshangjia(item,index)">
								去上架
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
			<!-- <u-empty  text="没有搜索结果" mode="search"  :show="goodList.length < 1"
					:marginTop="500"
			></u-empty> -->
			<u-back-top :scroll-top="scrollTop"  :top="1200" :bottom="200"></u-back-top>						
			<u-loadmore :status="status" v-if="goodList.length >= 10"/>	
		</scroll-view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: '未上架'
					}, 
					{
						name: '已上架'
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
				scrollTop: 0,//页面滚动高度
				scrollTop2:0,//我的收藏滚动高度
				height: 0, //scroll-view高度
				top: 0,
				old: { //官方解决抖动办法,记录就高度 二次传值
				   scrollTop:0,//商品列表右侧滚动高度
				   scrollTop2:0,//我的收藏滚动高度
				},
			};
		},
		onLoad() {
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header =0;
						let top = 0;
						console.log(res);
						//#ifdef H5
						this.height = res.windowHeight - uni.upx2px(272);
						top = 44;
						//#endif
						//#ifdef APP-PLUS
						top = 44;
						this.height = res.windowHeight - uni.upx2px(272);
						//#endif
						this.top = top + uni.upx2px(header); 
					}
				});
			}, 50);
		},
		methods:{
			back(){
				uni.navigateBack({
					
				})
			},
			change(index) {
				this.current = index;
			},
			Toshangjia(item,index){
				uni.navigateTo({
					url:'sjdetail?ypinfo='+JSON.stringify(item)
				})
			},
			scroll2(e) {
				//动画时长固定300ms
				if (!this.isScroll) {
					setTimeout(() => {
						this.isScroll = true;
					}, 150);
				} else {
					// this.scrollTop2 = e.detail.scrollTop;
					this.old.scrollTop2 = e.detail.scrollTop;//官方解决办法
				}
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
		color: #FFFFFF;
	}
	/deep/ .uni-searchbar{
		background-color: transparent !important;
	}
	.navbar{
		display: flex;
		width: 100vw;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20px;
		.navbar-title{
			box-sizing: border-box;
			width: 100%;

			text-align: center;
		}
	}
	
	.goodlist2 {
		width: 100vw;
		margin: 4px 0;
		background-color: rgba($color: #ffffff, $alpha: 0.5);

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
	.kucun2{
		position: absolute; 
		bottom:  10rpx; 
		width: 100%; 
		height: 20px; 
		text-align: center;
		font-size: 16px;
		color: #ff0000;
	}
	.content-img2 image {
		width: 100%;
		height: 100%;
	}
	.content-text2 {
		flex: 1;	
		font-size: 15px;
		color: #767676;
	}
	.text-item2 {
		margin: 3px 0;
		font-size: 14px;
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
	.text-shangjia{
		margin: 3px 20px;
		padding: 2px 0;
		text-align: center;
		font-size: 20px;
		color: #FFFFFF;
		background-color: #ff0000;
	}
</style>
