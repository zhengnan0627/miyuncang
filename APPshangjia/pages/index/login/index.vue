<template>
	<view class="container">
		<view class="img">
			<image :src="imgurl" mode="aspectFit"></image>
		</view>
		<view class="title">
			<text style="margin-right: 4px;">{{appname}}</text>
			<text>V{{version}}</text>
		</view>
		<view class="top">
			<view class="top-img">
				<image src="/static/touxiang.png" mode=""></image>
			</view>
			<view class="top-text" @click="denglu">
				点击登录
			</view>
		</view>
		<view class="top">
			<view class="top-img">
				<image src="/static/fuwuqi.png" mode=""></image>
			</view>
			<view class="top-text" @click="peizhi">
				服务器配置
			</view>
		</view>
		<view class="footer" v-if="gongsi">
			<view class="footer-title">
				<text style="margin-right: 4px;">{{gongsi}}</text>
				<text>版权所有</text>
			</view>
			<view class="footer-ser">
				<text>{{banben}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgurl:'',//公司logo，默认为空
				appname:'',//APP名称,默认为空
				gongsi:'',//公司名，默认为空
				banben:'',//版本发布时间，默认为空
				version:'1.0.1',//版本号
			}
		},
		onLoad() {
			this.appname = uni.getStorageSync('appname') ? uni.getStorageSync('appname') : '期初上架';
			this.imgurl = uni.getStorageSync('imgurl') ? uni.getStorageSync('imgurl') : '../../../static/logo.png';
			this.gongsi = uni.getStorageSync('gongsi') ? uni.getStorageSync('gongsi') : '';
			this.banben = uni.getStorageSync('banben') ? uni.getStorageSync('banben') : '';
			//#ifdef APP-PLUS
			this.version = plus.runtime.version  ? plus.runtime.version  : '1.0.1'
			/** 检测升级 */
			//整包更新前端代码
			// var server = "http://152.136.28.147:9009/VXMail/PublicUrl.ashx"; //检查更新地址
			var req = { //升级检测数据
				"proc":"MYC_APP_DATA",
				"type":"获取版本更新",
				"appid": plus.runtime.appid, 
				"version": plus.runtime.version  
			}; 
			if(uni.getStorageSync('baseUrl')){
				this.$request({
					data:req
				}).then(res => {
					if (res.Msg_info[0].status == 1) {
					    uni.showModal({ //提醒用户更新  
					        title: "更新提示",  
					        content: res.Msg_info[0].note,  
					        success: (ress) => {  
					            if (ress.confirm) {  									
					                plus.runtime.openURL(res.Msg_info[0].url);  
					            }  
					        }  
					    })  
					} 
				}) 
			}    
			//#endif	
		},
		methods: {
			denglu(){
				uni.navigateTo({
					url:'login'
				})
			},
			peizhi(){
				uni.navigateTo({
					url:'peizhi'
				})
			},
		}
	}
</script>

<style lang="scss" scoped> 
	.container {
		height: 100vh;
	}
	.img{
		padding-top: 80rpx;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	.img image{
		width: 100px;
		height: 100px;
	}
	.title{
		width: 100%;
		height: 80rpx;
		line-height: 40px;
		text-align: center;
		font-size: 18px;
		color: #FFFFFF;
	}
	.top{
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 80px;	
		text-align: center;
		font-size: 30px;
		color: #FFFFFF;
	}
	.top-img{
		width: 60px;
		height: 60px;
	}
	.top-img image{
		width: 60px;
		height: 60px;
	}
	.top-text{
		padding: 0 10px;
		width: 200px;
	}
	.input{
		box-sizing: border-box;
		margin: 100rpx 60rpx;
		font-size: 18px;
		color: #FFFFFF !important; 
	}
	.input-bianhao{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.confirm3{
		margin-left: 7rpx;
		margin-top: 8px;
		width:160rpx;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #ffffff;
		color: #000000;
		border-radius: 3.57rpx;
	}
	.input /deep/ .u-field,
	.input /deep/ input{
		font-size: 18px;
		color: #FFFFFF !important; 
	}
	.denglu{
		box-sizing: border-box;
		margin: 40rpx auto;
		width: 60vw;
		height: 80rpx;
		line-height: 40px;
		text-align: center;
		font-size: 20px;
		background-color: #FFFFFF;
		border-radius: 4px;
	}
	.footer{
		position: fixed;
		bottom: 10px;
		box-sizing: border-box;
		
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #FFFFFF !important; 
	}
</style>
