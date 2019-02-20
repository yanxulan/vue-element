<template>
	<div class="login-app">
		<div class="login-outbox">
			<div class="login-box">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" class="login-ruleForm">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click="submitForm('ruleForm')" class="login-btn">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				ruleForm: {
					name: '',
					password: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {

		},
		mounted() {
			this.$nextTick(function() {

			});
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.login();
					} else {
						return false;
					}
				});
			},
			login() { // 登录
			    this.$message.success("登录成功");
				this.$router.push('/index');
				// this.$axios.post('{登录接口}', {}).then(res => {
				// 	if(res && res.status == 'success') {
				// 		this.$message.success("登录成功");
				// 		this.$router.push('/index');
				// 	}
				// });
			}
		},
		watch: {

		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.login-app{
		width: 100%;
		height: 100%;
		background-image: url('../../src/assets/img/login/login_bg.png');
		background-repeat: no-repeat;
		background-color: #b8e5f8;
		background-size: cover;
		overflow: auto;
		.login-outbox{
			flex: 1 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 688px;
			height: calc(100% - 42px);
			.login-box {
				width: 432px;
				margin: 0 auto;
			    background: #FFFFFF;
				overflow: hidden;
				border-radius: 2px;
				padding: 30px;
				box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
				.login-ruleForm{
				}
				.login-btn{
					display: block;
					margin: 0 auto;
				}
			}
		}
	}
</style>