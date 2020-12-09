<template>
	<view class="container">
		<!-- <view class="navbar">
			<u-icon name="arrow-left" @click="back"></u-icon>
			<view class="navbar-title"><text style="margin-left: -40rpx;">上架药品详情</text></view>
		</view> -->
		<u-navbar  title="药品上架详情" :background="{background: 'transparent'}" back-icon-color="#ffffff" title-color="#ffffff" :border-bottom="false"></u-navbar>
		<view class="goodlist2">
			<view class="list-content2" >
				<view class="content-text2">
					<view class="text-item2 text-bianhao2 text-flex">
						<view class="" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
							<text class="itemflex-text">品名:</text> &nbsp{{ypinfo.yp_name}}	
						</view>
						<view class="">
							<text class="itemflex-text">批号:</text>&nbsp{{ypinfo.yp_pihao}}
						</view>
					</view>
					<view class="text-item2 text-guige2 text-flex">
						<view class="">
							<text class="itemflex-text">规格:</text>&nbsp{{ypinfo.yp_guige}}
						</view>
						<view class="">
							<text class="itemflex-text">单位:</text>&nbsp{{ypinfo.yp_danwei}}	
						</view>
					</view>
					<view class="text-item2 text-guige2 text-flex">
						<view class="">
							<text class="itemflex-text">效期:</text>{{ypinfo.yp_xiaoqi}}
						</view>
						<view class="">
							<text class="itemflex-text">库存:</text>
							<text style="font-size: 16px; color: #ff0000;">{{ypinfo.yp_sy_kucun}}</text>
						</view>
					</view>
					<view class="text-item2 text-factory2">
						<text class="itemflex-text">厂家:</text>{{ypinfo.yp_factory}}
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="add">
			<uni-icons type="plusempty" :size="40" color="#d40000"></uni-icons>
		</view> -->
		<scroll-view
			@scroll="scroll2"
			:scroll-y='false'
			:scroll-top="scrollTop2"
			class="SCscroll-box"
			@scrolltolower="scrolltolower2"
			:style="{ height: height + 'px', top: top + 'px' }"
			>
		<template v-for="(item,index) in 1">
			<view class="shangjialist" :key="index">
				<u-field v-model="weizhi" label="上架货架编号"label-width="200" :clearable="false"></u-field>
				<u-field v-model="num" label="上架数量"label-width="200" type="number" :clearable="false"></u-field>
				<!-- <view class="content-text">
					<view class="text-container">
						<view class="text-title">
							上架货架编号
						</view>
						<view class="text-num">
							{{item.bianhao}}
						</view>
					</view>
					<view class="text-container">
						<view class="text-title">
							上架数量
						</view>
						<view class="text-num">
							{{item.num}}
						</view>
					</view>
				</view> -->
			<!-- 	<view class="content-icon" >
					<uni-icons type="trash" :size="40" color="#ff0000"></uni-icons>
				</view> -->
			</view>
		</template>
		</scroll-view>
		<view class="footer" @click="confirmxinxi">
			确认上架信息
		</view>
		<!-- 确认所有上架信息提示框 -->
		<u-modal v-model="show" :content="content" @confirm="tuichu" title="确认提示"
				width="auto" height="auto" show-cancel-button cancel-text="取消"
				:title-style="{paddingTop:'10px'}" :content-style="{padding:'20px 20px',fontSize:'20px',color:'#606266'}"
				:cancel-style="{fontSize:'16px',alignItems:'center'}"
				:confirm-style="{fontSize:'16px',alignItems:'center'}">
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yg_id:'',//员工id,从缓存中取
				ypinfo:{},//所选上架药品信息，从上级页面传入
				weizhi:'',
				num:'',
				shangjialist:[
					// {bianhao:'L01-02-03',num:'30'},
					// {bianhao:'L01-02-03',num:'70(默认剩余库存数量)'},
				],
				scrollTop: 0,//页面滚动高度
				scrollTop2:0,//我的收藏滚动高度
				height: 0, //scroll-view高度
				top: 0,
				old: { //官方解决抖动办法,记录就高度 二次传值
				   scrollTop:0,//商品列表右侧滚动高度
				   scrollTop2:0,//我的收藏滚动高度
				},
				show: false,//退出登录状态
				content: '药品上架后,信息将无法修改',//退出登录文本
			};
		},
		onLoad(option) {
			this.yg_id = uni.getStorageSync('ygId')
			this.ypinfo = JSON.parse(option.ypinfo)
			setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let header =0;
						let top = 0;
						console.log(res);
						//#ifdef H5
						this.height = res.windowHeight - uni.upx2px(430);
						top = 44;
						//#endif
						//#ifdef APP-PLUS
						top = 44;
						this.height = res.windowHeight - uni.upx2px(482);
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
			confirmxinxi(){
				this.show = true
			},
			tuichu(){
				if(+this.num > +this.ypinfo.yp_sy_kucun || +this.num < 0){
					uni.showToast({
						title:'请确认输入数量',
						icon:'none'
					})
					return
				}
				this.$request({
					data:{
						'proc':'MYC_APP_DATA',
						'type':'上架',
						'yg_id':this.yg_id,
						'yp_id':this.ypinfo.yp_id,
						'yp_pihao':this.ypinfo.yp_pihao,
						'weizhi':this.weizhi,
						'num':this.num
						}
				}).then(res =>{
					const resdata = res.Msg_info[0]
					if(resdata.error){
						uni.showToast({
							title:resdata.error,
							icon:'none'
						})
						return
					}else{
						
						uni.$emit('shangjia')
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},1500)
						uni.showToast({
							title:resdata.note,
						})
					}
					
				})
				
			}
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
		// margin: 4px 0;
		color: #FFFFFF;
		height: 240rpx;
		margin-bottom: 6px;
		// background-color: rgba($color: #ffffff, $alpha: 0.5);
		border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.5);

	}
	.list-content2 {
		box-sizing: border-box;
		width: 100vw;
		height: 220rpx;
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
		padding: 0 5px;
		flex: 1;	
		font-size: 15px;
		color: #FFFFFF;
	}
	.text-item2 {
		margin: 3px 0;
		font-size: 16px;
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
	.add{
		position: fixed;
		bottom: 140rpx;
		right: 40rpx;
		padding: 2px 2px;
		border-radius: 50%;
		z-index: 999999;
		background-color: rgba($color: #ffffff, $alpha: 1);
	}
	.shangjialist{
		width: 98vw;
		margin: 2px auto;
		padding: 5px 0;
		background-color: rgba($color: #ffffff, $alpha: 0.5);
		/deep/.uni-input-input{
			color: #FFFFFF;
			font-size: 16px;
		}
		/deep/.u-field{
			font-size: 16px !important;
		}
		.content-text{
			flex: 1;
			.text-container{
				display: flex;
				margin-left: 10px;
				height: 40px;
				line-height: 40px;
				font-size: 32rpx;
				.text-title{
					width: 120px;
					color: #000000;
				}
				.text-num{
					flex: 1;
					border-bottom: 1px solid #EEEEEE;
				}
			}
		}
		.content-icon{
			width: 70px;
			text-align: center;
		}
	}
	.footer{
		height: 80rpx;
		line-height: 80rpx;
		width: 98vw;
		margin: 0 auto;
		text-align: center;
		font-size: 22px;
		background-color: #FFFFFF;
		color: #007AFF;
	}
</style>
