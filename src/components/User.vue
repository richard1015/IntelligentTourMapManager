<template>
  <div>
    <!-- 新增信息begin -->
    <Drawer title="新增/修改" v-model="formState" width="720" :mask-closable="true">
      <Form :model="formData" ref="formValidate" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="账号名称" label-position="top" prop="username">
              <Input v-model="formData.username" placeholder="请输入账号名称"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="密码" label-position="top" prop="password">
              <Input v-model="formData.password" placeholder="请输入密码"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号" label-position="top" prop="phone">
              <Input v-model="formData.phone" placeholder="请输入手机号"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="formState = false">取消</Button>
        <Button type="primary" @click="submitForm('formValidate')">提交</Button>
      </div>
    </Drawer>
    <!-- 新增信息End -->
    <Row :gutter="16">
      <Col span="6">
        <Button @click="addForm" type="success" long>新增</Button>
      </Col>
      <Col span="18">
        <Input search enter-button @on-search="search" placeholder="搜索..."/>
      </Col>
    </Row>
    <br>
    <Table
      @on-sort-change="tableSoreChange"
      border
      :data="tableInfo.arrays"
      :columns="tableColumns"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <Page :total="tableInfo.totalCount" @on-change="changePage" :page-size="params.pageSize"></Page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleValidate: {
        username: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请填写手机号",
            trigger: "blur"
          }
        ]
      },
      formData: {
        username: "",
        phone: "",
        password: "",
        _id: ""
      },
      formState: false,
      params: {
        orderBy: "",
        pageIndex: 1,
        pageSize: 10,
        keyword: ""
      },
      tableInfo: {
        pageIndex: 0, //当前页数
        pageSize: 0, //分页数量
        totalCount: 0, //总数量
        arrays: []
      },
      tableColumns: [
        {
          title: "Id",
          key: "_id"
          // sortable: "custom"
        },
        {
          title: "账号",
          key: "username"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "更新时间",
          key: "updateTime"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.formData._id = params.row._id;
                      this.formData.username = params.row.username;
                      this.formData.password = params.row.password;
                      this.formData.phone = params.row.phone;
                      this.formState = true;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Poptip",
                {
                  props: {
                    title: "确定删除吗?",
                    confirm: true,
                    placement: "left"
                  },
                  on: {
                    "on-ok": () => {
                      this.remove(params.row._id, params.index);
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.$api.getUser(this.params).then(res => {
        if (res) {
          this.tableInfo = res;
        }
      });
    },

    remove(id, index) {
      this.$api.deleteUser({ id }).then(res => {
        if (res) {
          this.tableInfo.arrays.splice(index, 1);
          this.$Message.success("删除成功!(目前演示功能不做真实删除，下载源码后，自行修改后台代码逻辑)");
        }
      });
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //id = 0 代表 新增 否则 代表更新
          this.$api.modifyUser(this.formData).then(res => {
            if (res) {
              this.$Message.success("提交成功!");
              this.formState = false;
              this.getDataList();
            }
          });
        } else {
          // this.$Message.error("Fail!");
        }
      });
    },
    //新增
    addForm() {
      this.formState = true;
      this.fileArray = [];
      this.formData = {
        username: "",
        phone: "",
        password: "",
        _id: ""
      };
    },
    //翻页
    changePage(pageIndex) {
      this.params.pageIndex = pageIndex;
      this.getDataList();
    },
    //搜索
    search(value) {
      this.params = {
        orderBy: "",
        pageIndex: 1,
        pageSize: 10,
        keyword: value.trim()
      };
      this.getDataList();
    },
    /**
     *  column：当前列数据
        key：排序依据的指标
        order：排序的顺序，值为 asc 或 desc
     */
    tableSoreChange({ column, key, order }) {
      let orderStr = "id";
      if (order == "desc") {
        orderStr = "-id";
      }
      this.params.orderBy = orderStr;
      this.params.pageIndex = 1;
      this.params.pageSize = 10;
      this.getDataList();
    }
  }
};
</script>
