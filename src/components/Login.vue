<template>
  <div class="login">
    <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-center">
      <div class="ivu-col ivu-col-span-24">
        <div>
          <div class="dev-sign-main ivu-card ivu-card-dis-hover ivu-card-shadow">
            <div class="ivu-card-head">
              <p>登录 导览图管理后台</p>
            </div>
            <!---->
            <div class="ivu-card-body">
              <form autocomplete="off" class="ivu-form ivu-form-label-top">
                <div class="ivu-form-item ivu-form-item-required">
                  <label class="ivu-form-item-label">账号</label>
                  <div class="ivu-form-item-content">
                    <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                      <!---->
                      <!---->
                      <i
                        class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"
                      ></i>
                      <input
                        autocomplete="off"
                        spellcheck="false"
                        :value="username"
                        type="text"
                        placeholder
                        class="ivu-input ivu-input-large ivu-input-with-prefix"
                      >
                      <span class="ivu-input-prefix">
                        <i class="ivu-icon ivu-icon-ios-person-outline"></i>
                      </span>
                    </div>
                    <!---->
                  </div>
                </div>
                <div class="ivu-form-item ivu-form-item-required">
                  <label class="ivu-form-item-label">密码</label>
                  <div class="ivu-form-item-content">
                    <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
                      <!---->
                      <i class="ivu-icon ivu-icon-ios-eye ivu-input-icon ivu-input-icon-normal"></i>
                      <!---->
                      <input
                        :value="password"
                        autocomplete="off"
                        spellcheck="false"
                        type="password"
                        placeholder
                        class="ivu-input ivu-input-large ivu-input-with-prefix"
                      >
                      <span class="ivu-input-prefix">
                        <i class="ivu-icon ivu-icon-ios-lock-outline"></i>
                      </span>
                    </div>
                    <!---->
                  </div>
                </div>
              </form>
              <div class="dev-sign-main-aside">
                <button
                  @click="login"
                  type="button"
                  class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large"
                >
                  <!---->
                  <!---->
                  <span>登录</span>
                </button>
                <!-- <div class="dev-sign-main-aside-tip">
                <p>
                  <a href="/recover" class>忘记密码？</a>
                </p>
                <p>
                  尚未拥有账户？
                  <a href="/signup" class>注册</a>
                </p>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin",
      password: "admin"
    };
  },
  methods: {
    login() {
      const { username, password } = this;
      this.$api.login({ username, password }).then(res => {
        this.$router.push("Main/User");
      });
    }
  }
};
</script>

<style>
.login {
  background: url("../assets/bg.jpg") no-repeat center;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}
.dev-sign-main {
  width: 400px;
  margin: 50px auto;
  padding: 0 16px;
  text-align: left;
}
</style>