<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1" to="/User">
          <Icon type="ios-people"/>用户管理
        </MenuItem>
        <MenuItem name="2" to="/School">
          <Icon type="ios-paper"/>内容管理
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats"/>统计分析
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="4">
          <Icon type="ios-construct"/>综合设置
        </MenuItem>
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
      theme1: "light"
    };
  }
};
</script>

<style>
.ivu-layout-header {
  padding: 0 !important;
}
</style>
