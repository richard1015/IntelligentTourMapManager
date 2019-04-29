<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1" to="/Main/User">
          <Icon type="ios-people"/>用户管理
        </MenuItem>
        <MenuItem name="2" to="/Main/School">
          <Icon type="ios-paper"/>内容管理
        </MenuItem>
        <MenuItem name="3" to="/Main/Logs">
          <Icon type="ios-paper"/>实时日志
        </MenuItem>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-navigate"/>
            {{userInfo.username}}
          </template>
          <MenuItem name="3-1" to="/">退出</MenuItem>
        </Submenu>
      </Menu>
    </Header>
    <Content
      :style="{ margin: '0px 2px 0px',padding:'10px 10px', background: '#fff', minHeight: '500px'}"
    >
      <router-view/>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      theme1: "light",
      userInfo: {}
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }
};
</script>

<style>
.ivu-layout-header {
  padding: 0 !important;
}
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
  display: none !important;
}
</style>
