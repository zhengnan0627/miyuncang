<template>
	<view class="container">
		<!-- <view class="navbar">
			<u-icon name="home" @click="back"></u-icon>
			<view class="navbar-title"><text style="margin-left: -40rpx;">上架药品列表</text></view>
		</view> -->
		<u-navbar  title="上架药品列表" back-icon-name="home" back-icon-size="30" :custom-back="true" @leftIcon="back" :background="{background: 'transparent'}" back-icon-color="#ffffff" title-color="#ffffff" :border-bottom="false"></u-navbar>
		<uni-search-bar bgColor="#ffffff" :radius="20" placeholder="搜索药品" @confirm="search" @cancel="cancle"></uni-search-bar>
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
				<view class="list-content2" v-if="current == 0">	
					<view class="content-text2">
						<view class="text-item2 text-name2" style="font-size: 15px; color: #000000;" @click="goodsdetail(item,index)">
							
						</view>
						<view class="text-item2 text-bianhao2 text-flex">
							<view class="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								<text class="itemflex-text">品名:</text>&nbsp{{item.yp_name}}	
							</view>
							<view class="">
								<text class="itemflex-text">批号:</text>&nbsp{{item.yp_pihao}}	
							</view>
						</view>
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="itemflex-text">规格:</text>&nbsp{{item.yp_guige}}
							</view>
							<view class="">
								<text class="itemflex-text">单位:</text>&nbsp{{item.yp_danwei}}	
							</view>
						</view>
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="itemflex-text">效期:</text>&nbsp{{item.yp_xiaoqi}}
							</view>
							<view class="">
								<text class="itemflex-text">库存:</text>&nbsp
								<text style="font-size: 16px; color: #ff0000;">{{item.yp_sy_kucun}}</text> 
							</view>
						</view>
						<view class="text-item2 text-factory2">
							<text class="itemflex-text">厂家:</text>&nbsp{{item.yp_factory}}
						</view>
					</view>
					<view class="content-img2" >
						<view class="text-shangjia" @click="Toshangjia(item,index)">
							去上架
						</view>
					</view>
				</view>
				<view class="list-content2" v-else>
					<view class="content-text2">
						<view class="text-item2 text-bianhao2 text-flex">
							<view class="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								<text class="itemflex-text">品名:</text>&nbsp{{item.yp_name}}	
							</view>
							<view class="">
								<text class="itemflex-text">批号:</text>&nbsp{{item.yp_pihao}}	
							</view>
						</view>
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="itemflex-text">规格:</text>&nbsp{{item.yp_guige}}
							</view>
							<view class="">
								<text class="itemflex-text">单位:</text>&nbsp{{item.yp_danwei}}	
							</view>
						</view>
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="itemflex-text">效期:</text>&nbsp{{item.yp_xiaoqi}}
							</view>
							<view class="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								<text class="itemflex-text">厂家:</text>&nbsp{{item.yp_factory}}
							</view>
						</view>
						<view class="text-item2 text-guige2 text-flex">
							<view class="">
								<text class="itemflex-text">货架号:</text>&nbsp{{item.yp_sj_weizhi}}
							</view>
							<view class="">
								<text class="itemflex-text">数量:</text>&nbsp{{item.yp_sj_num}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
				<u-empty  text="没有搜索结果" mode="search"  :show="goodList.length < 1"
						:marginTop="-120"
				></u-empty>
				<!-- <u-back-top :scroll-top="old.scrollTop2" @scrollTop2="backscrollTop2"  :top="1200" :bottom="200"></u-back-top> -->						
			<!-- <u-loadmore :status="status" v-if="goodList.length >= 10"/>	 -->
		</scroll-view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yg_id:'',//员工id,从缓存中取
				sub_type:'未上架',//接口参数（未上架/已上架两种）
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
					// {"g_name":"A0_(麦克普瑞康)灵芝胶囊","g_image":"/static/logo.png","g_bianhao":"100321312","g_zhuji":"MKPRKLZJN","g_factory":"天圣制药集团股份有限公司","g_guige":"12粒/板","star":false,"g_price":"23","g_kucun":"1452","g_pihao":"14321","g_youxiaoqi":"2022-10-11","g_kucun1":"873"},
				],
				status: 'loadmore',//加载更多组件：加载前值为loadmore，加载中为loading，没有数据为nomore
				pageindex:1,//当前数据分页数
				total_page:null,//总分页数
				key:'',//搜索key
				isScroll:true,
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
			this.yg_id = uni.getStorageSync('ygId')
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
						this.height = res.windowHeight - uni.upx2px(324);
						//#endif
						this.top = top + uni.upx2px(header); 
					}
				});
			}, 50);
			// this.request()
			uni.$on('shangjia',() => {
				this.key = ''
				this.goodList = []
				// this.request()
			})
		},
		onUnload() {
			uni.$off('shangjia')
		},
		methods:{
			back(){
				uni.reLaunch({
					url:'login/index'
				})
			},
			//搜索方法
			search(e){ //点击键盘确定
				// console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.goodList = []
				this.request()
			},
			cancle(e){	//点击搜索二字
				// console.log(e.value);
				this.pageindex = 1
				this.key = e.value
				this.goodList = []
				this.request()
			},
			change(index) {
				this.current = index;
				if(this.current == 0){
					this.sub_type = '未上架'
					this.goodList = []
					this.key = ''
					// this.request()
				}else{
					this.sub_type = '已上架'
					this.goodList = []
					this.key = ''
					// this.request()
				}
			},
			Toshangjia(item,index){
				uni.navigateTo({
					url:'sjdetail?ypinfo='+JSON.stringify(item)
				})
			},
			request(){
				this.$request({
					data:{
						'proc':'MYC_APP_DATA',
						'type':'药品搜索',
						'yg_id':this.yg_id,
						'sub_type':this.sub_type,
						'key':this.key
						}
				}).then(res =>{
					const resdata = res.Msg_info
					if(resdata[0].error){
						this.goodList = []
					}
					else{
						this.goodList = resdata
					}
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
			backscrollTop2(){
				this.scrollTop2 = this.old.scrollTop2
				            this.$nextTick(function() {
				                this.scrollTop2 = 0
				});
				
			},
			//右侧滚动到底部方法
			scrolltolower2() {
				// if(this.pageindex2 >= this.total_page2){
				// 	this.status2 = 'nomore'
				// }else{
				// 	// console.log('到底了');
				// 	this.status2 = 'loading';
				// 	this.pageindex2 += 1;
				// }	
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
		height: 88rpx;
		line-height: 88rpx;
		font-size: 16px;
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
	.goodlist2:first-child{
		margin:0;
	}
	.list-content2 {
		width: 100vw;
		padding: 5px 5px;
		display: flex;
	}
	.content-img2 {
		width: 150rpx;
		justify-content: center;
		vertical-align: middle;
		display: flex;
		align-items: center;
	}
	.text-shangjia{
		padding: 2px 10px;
		text-align: center;
		font-size: 16px;
		color: #FFFFFF;
		background-color: #ff0000;
	}
	.content-text2 {
		flex: 1;	
		font-size: 15px;
		color: #767676;
	}
	.text-item2 {
		margin: 3px 0;
		font-size: 14px;
		color: #FFFFFF;
	}
	.itemflex-text{
		color: #000000;
		margin-right: 5px;
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
	
</style>
