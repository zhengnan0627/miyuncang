<template>
	<view class="container">
		<view class="img">
			<image src="../../../static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="title">
			<text style="margin-right: 4px;">{{appname}}</text>
			<text>V{{version}}</text>
		</view>
		<view class="input">
			<u-field v-model="baseUrl" :placeholder="placeholder"  :clearable="false" placeholder-style="color: #cccccc"></u-field>
		</view>
		<view class="denglu" @click="confirm">
			确定
		</view>
		<view class="denglu" @click="back">
			返回
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
		<u-popup v-model="show" mode="center" width="500" height="220" border-radius="8" :mask-close-able="false">
			<view class="" style="font-size: 24px; color: #000000; text-align: center;padding: 3px 0;">
				提示信息
			</view>
			<view class=""style="font-size:20px; color: #6c6c6c; text-align: center;padding:3px 0;">
				数据库连接成功
			</view>
			<view class="popup-confirm"  @click="popupconfirm" >
				确定
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appname:'',//APP名称,默认为空
				gongsi:'广州时空智友科技有限公司',//公司名，默认为空
				banben:'',//版本发布时间，默认为空
				baseUrl:'',//配置url				
				bianhao:'',
				password:'',
				showpassword:true,
				show:false,//弹出层
				placeholder:'',//输入框提示值
				version:'1.0.1'//版本号
			}
		},
		onLoad() {
			this.appname = uni.getStorageSync('appname') ? uni.getStorageSync('appname') : '期初上架';
			this.placeholder = uni.getStorageSync('baseUrl') ? uni.getStorageSync('baseUrl') : '请输入配置地址';
			this.gongsi = uni.getStorageSync('gongsi') ? uni.getStorageSync('gongsi') : '广州时空智友科技有限公司';
			this.banben = uni.getStorageSync('banben') ? uni.getStorageSync('banben') : '';
			//#ifdef APP-PLUS
			this.version = plus.runtime.version  ? plus.runtime.version  : '1.0.1'
			//#endif
		},
		methods: {
			showpasswords(){
				this.showpassword = !this.showpassword
			},
			// 点击确认按钮触发
			confirm(){
				this.show = true
			    // 输入框的值
				const value = this.baseUrl
				// console.log(this.baseUrl)
				const test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
				const testurl = test.test(value)
				if (testurl){
					uni.setStorageSync('baseUrl', value);
					console.log(value);
					this.$request({
						data:{'proc':'MYC_APP_DATA','type':'链接测试',}
					}).then(res => {		
						const resdata = res.Msg_info[0]
						// console.log(resdata);
						uni.setStorageSync('imgurl', resdata.logo);
						uni.setStorageSync('appname', resdata.product);
						uni.setStorageSync('gongsi', resdata.company);
						uni.setStorageSync('banben', resdata.bbqz);
						this.gongsi = resdata.company
						this.banben = resdata.bbqz
						this.show = true
					});
				}else {
					uni.showToast({
						icon:'none',
						title:'配置输入有误,请重新配置',
						duration:1000
					})
				}
			},
			back(){
				uni.navigateBack({
					
				})
			},
			popupconfirm(){
				this.show = false
				uni.reLaunch({
					url:'index'
				})
			}
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
		box-sizing: border-box;
		margin-top: 260rpx;
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #FFFFFF !important; 
	}
	.popup-confirm{
		width: 100px;
		height: 25px;
		line-height: 25px;
		font-size:16px;
		color: #6c6c6c;
		margin:auto;
		margin-top: 10px;
		text-align: center;
		border: 1px solid #6c6c6c;
		border-radius: 5rpx;
	}	
</style>
