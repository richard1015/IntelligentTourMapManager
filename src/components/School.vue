<template>
  <div>
    <!-- 新增信息begin -->
    <Drawer title="新增/修改" v-model="formState" width="720" :mask-closable="true">
      <Form :model="formData" ref="formValidate" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="24">
            <FormItem label="名称" label-position="top" prop="name">
              <Input v-model="formData.name" placeholder="请输入名称"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="经度" label-position="top" prop="gaoDeLon">
              <Input readonly v-model="formData.gaoDeLon" placeholder="请输入经度"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="纬度" label-position="top" prop="gaoDeLat">
              <Input readonly v-model="formData.gaoDeLat" placeholder="请输入纬度"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <AMap :location-array="locationArray" @locationChange="locationChange"></AMap>
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
import AMap from "@/components/common/AMap";
export default {
  components: {
    AMap
  },
  data() {
    return {
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入名称",
          }
        ],
        gaoDeLon: [
          {
            required: true,
            message: "请填写经度",
          }
        ],
        gaoDeLat: [
          {
            required: true,
            message: "请填写纬度",
          }
        ]
      },
      locationArray: [],
      formData: {
        name: "",
        gaoDeLon: "",
        gaoDeLat: "",
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
          title: "名称",
          key: "name"
        },
        {
          title: "经度",
          key: "gaoDeLon"
        },
        {
          title: "纬度",
          key: "gaoDeLat"
        },
        {
          title: "访问量",
          key: "count"
        },
        {
          title: "更新时间",
          key: "updateTime"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(`Spot/?pid=${params.row._id}`);
                    }
                  }
                },
                "管理标注点"
              ),
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
                      this.formData.name = params.row.name;
                      this.formData.gaoDeLon = params.row.gaoDeLon;
                      this.formData.gaoDeLat = params.row.gaoDeLat;
                      this.locationArray = [
                        params.row.gaoDeLon,
                        params.row.gaoDeLat
                      ];
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
    /**
     * 经纬度改变事件
     */
    locationChange(location) {
      console.log("收到：", location);
      if (location.length) {
        this.formData.gaoDeLon = location[0];
        this.formData.gaoDeLat = location[1];
      } else {
        this.formData.gaoDeLon = "";
        this.formData.gaoDeLat = "";
      }
    },
    getDataList() {
      this.$api.getSchool(this.params).then(res => {
        if (res) {
          this.tableInfo = res;
        }
      });
    },

    remove(id, index) {
      this.$api.deleteSchool({ id }).then(res => {
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
          this.$api.modifySchool(this.formData).then(res => {
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
      this.locationArray = [];
      this.formData = {
        gaoDeLon: "",
        gaoDeLat: "",
        name: "",
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
