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
			<view class="input-bianhao">
				<u-field v-model="bianhao" label="工号" type="number" :clearable="false"></u-field>
				<view class="confirm3" :class="{'confirm4':bianhao!=''}" @click="bianhao!=''?confirm():''">
					确认
				</view>
			</view>
			<u-field v-model="name" label="姓名" :clearable="false"></u-field>
			<u-field v-model="mima"label="密码":password="showpassword":clearable="false"right-icon="eye" clear-size="20" @right-icon-click="showpasswords"></u-field>		
		</view>
		<view class="denglu" @click="denglu">
			登录
		</view>
		<view class="denglu" @click="back">
			返回
		</view>
		<view class="footer"  v-if="gongsi">
			<view class="footer-title">
				<text>{{gongsi}}</text>
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
				appname:'',//APP名称
				bianhao:'',
				name:'',
				mima:'',
				showpassword:true,
				jiaoyanmima:'',//服务器返回密码用于校验
				jiaoyanbianhao:'',//服务器返回密码用于校验
				ygid:'',//服务器返回员工主键id
				version:'1.0.1',//版本号
				gongsi:'',//公司名，默认为空
				banben:''//版本信息
			}
		},
		onLoad() {
			this.gongsi = uni.getStorageSync('gongsi') ? uni.getStorageSync('gongsi') : '';
			this.banben = uni.getStorageSync('banben') ? uni.getStorageSync('banben') : '';
			this.appname = uni.getStorageSync('appname') ? uni.getStorageSync('appname') : '期初上架';
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
			    // 输入框的值
				const gh = this.bianhao
				this.$request({
					data:{'proc':'MYC_APP_DATA','type':'工号验证','gh':gh}
				}).then(res =>{
					console.log(res.Msg_info[0]);
					const resdata = res.Msg_info[0]
					if(resdata.error){
						uni.showToast({
							title:'无此工号,请重新输入',
							icon:'none',
						})
						this.name = ''
						this.mima = ''
						this.jiaoyanmima = ''
					}
					else{
						this.name = resdata.yg_name
						this.jiaoyanmima = resdata.password
						uni.setStorageSync('ygId', resdata.yg_id);//缓存员工主键id
						uni.setStorageSync('ygName', resdata.yg_name);//缓存员工姓名
					}
				})
			},
			denglu(){	
				if(this.jiaoyanmima == this.mima&&this.name){
					uni.navigateTo({
						url:'../sjyaopin'
					})
					// console.log('登录成功');
				}else{
					uni.showToast({
						title:'登录失败,请重试',
						icon:'none',
						duration:1000
					})
				}
			},
			back(){
				uni.navigateBack({
					
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
		width: 200rpx;
		height: 200rpx;
	}
	.title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
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
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #ffffff;
		color: #000000;
		border-radius: 8rpx;
	}
	.confirm4{
		// background-color: #00aaff;
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
		line-height: 80rpx;
		text-align: center;
		font-size: 20px;
		background-color: #FFFFFF;
		border-radius: 4px;
	}
	.footer{
		box-sizing: border-box;
		margin-top: 80rpx;
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #FFFFFF !important; 
	}
</style>
