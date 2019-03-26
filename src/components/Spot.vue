<template>
  <div>
    <!-- 新增信息begin -->
    <Drawer title="新增/修改" v-model="formState" width="720" :mask-closable="true">
      <Form :model="formData" ref="formValidate" :rules="ruleValidate">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="名称" label-position="top" prop="name">
              <Input v-model="formData.name" placeholder="请输入名称"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="自动播放距离" label-position="top" prop="distance">
              <Input v-model="formData.distance" placeholder="请输入距离"/>
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
          <Col span="24">
            <Upload
              ref="upload"
              :default-file-list="defaultFileList"
              :on-success="handleSuccess"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              :format="['MP3','mp3']"
              :max-size="5120"
              type="drag"
              :action="uploadUrl"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或拖拽文件到这里进行上传</p>
              </div>
            </Upload>
            <!-- <Input readonly v-model="formData.voiceUrl" placeholder="请上传音频文件"/> -->
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
            message: "请输入名称"
          }
        ],
        distance: [
          {
            required: true,
            message: "请输入智能播放距离"
          }
        ],
        gaoDeLon: [
          {
            required: true,
            message: "请填写经度"
          }
        ],
        gaoDeLat: [
          {
            required: true,
            message: "请填写纬度"
          }
        ]
      },
      defaultFileList: [
        // {
        //   name: "145310840472829.mp3",
        //   url:
        //     "https://yjly.oss-cn-beijing.aliyuncs.com/yjly/power/145310840472829.MP3"
        // }
      ], //默认已上传文件列表
      uploadUrl: this.$api.baseUrl + "/common/upload",
      locationArray: [],
      formData: {
        name: "",
        gaoDeLon: "",
        gaoDeLat: "",
        voiceUrl: "",
        distance: "",
        _id: ""
      },
      formState: false,
      params: {
        orderBy: "",
        pid: 0,
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
          title: "智能播放距离",
          key: "distance"
        },
        {
          title: "音频",
          key: "voiceUrl",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    shape: "circle",
                    icon: "ios-headset"
                  },
                  on: {
                    click: () => {
                      const content = `<audio autoplay controls>
                                        <source src="${params.row.voiceUrl}">
                                          您的浏览器不支持 audio 元素。
                                      </audio>`;
                      this.$Modal.success({
                        title: params.row.name,
                        content: content
                      });
                    }
                  }
                }
                // "播放"
              )
            ]);
          }
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
                      this.formData.name = params.row.name;
                      this.formData.gaoDeLon = params.row.gaoDeLon;
                      this.formData.gaoDeLat = params.row.gaoDeLat;
                      this.locationArray = [
                        params.row.gaoDeLon,
                        params.row.gaoDeLat
                      ];
                      this.formData.distance = params.row.distance;
                      this.formData.voiceUrl = params.row.voiceUrl;
                      this.defaultFileList = [
                        {
                          name: params.row.name + ".mp3",
                          url: params.row.voiceUrl
                        }
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
    let { pid } = this.$router.currentRoute.query;
    if (!pid) {
      this.$Message.error("请从内容管理点击进入,1s后跳转!");
      setTimeout(() => {
        this.$router.push("/Main/School");
      }, 2000);
    } else {
      this.params.pid = pid;
      this.getDataList();
    }
  },

  methods: {
    handleView(name) {
      this.fileName = name;
    },
    handleRemove(file) {
      // const fileList = this.$refs.upload.fileList;
      // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      if (res.success) {
        file.url = res.data;
        this.formData.voiceUrl = res.data;
        this.defaultFileList = [
          {
            name: file.name + ".mp3",
            url: res.data
          }
        ];
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: file.name + "的文件格式不正确，请选择MP3"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小超出限制",
        desc: "File  " + file.name + " is too large, no more than 5M."
      });
    },
    handleBeforeUpload() {
      const check = true;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    /**
     * 经纬度改变事件
     */
    locationChange(location) {
      if (location.length) {
        this.formData.gaoDeLon = location[0];
        this.formData.gaoDeLat = location[1];
      } else {
        this.formData.gaoDeLon = "";
        this.formData.gaoDeLat = "";
      }
    },
    getDataList() {
      this.$api.getSpot(this.params).then(res => {
        if (res) {
          this.tableInfo = res;
        }
      });
    },

    remove(id, index) {
      this.$api.deleteSpot({ id }).then(res => {
        if (res) {
          this.tableInfo.arrays.splice(index, 1);
          this.$Message.success("删除成功!");
        }
      });
    },
    submitForm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formData.pid = this.params.pid;
          //id = 0 代表 新增 否则 代表更新
          this.$api.modifySpot(this.formData).then(res => {
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
        name: "",
        gaoDeLon: "",
        gaoDeLat: "",
        voiceUrl: "",
        distance: "",
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
      this.params.orderBy = "";
      this.params.pageIndex = 1;
      this.params.pageSize = 10;
      this.params.keyword = value.trim();
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
