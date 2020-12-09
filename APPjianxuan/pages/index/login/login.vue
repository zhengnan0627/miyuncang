<template>
	<view class="container">
		<view class="img">
			<image src="../../../static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="title">
			<text>仓储管理系统-移动端</text>
			<text>V1.0</text>
		</view>
		<view class="input">
			<u-field v-model="mobile" label="账户" :clearable="false"></u-field>
			<u-field v-model="password"label="密码":password="showpassword":clearable="false"right-icon="eye" clear-size="20" @right-icon-click="showpasswords"></u-field>		
		</view>
		<view class="denglu" @click="denglu">
			登录
		</view>
		<view class="footer">
			<view class="footer-title">
				<text>广州时空智友科技有限公司</text>
				<text>版权所有</text>
			</view>
			<view class="footer-ser">
				<text>Copyright @ 2020 All Rights Reserved</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:'',
				password:'',
				showpassword:true,
			}
		},
		onLoad() {

		},
		methods: {
			showpasswords(){
				this.showpassword = !this.showpassword
			},
			denglu(){
				console.log(this.mobile,this.password);
				uni.navigateTo({
					url:'../index'
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
		margin-top: 400rpx;
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #FFFFFF !important; 
	}
</style>
