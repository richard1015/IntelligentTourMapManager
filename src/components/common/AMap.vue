<!--
 * @Description: 
    props >> locationArray 经纬度数组  英文逗号分隔
 * @Author: zhuzhida
 * @Date: 2019-01-21 18:37:18
 * @LastEditTime: 2019-03-26 13:47:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="cAmap">
    <p>小提示：地图上单击鼠标即可完成经纬度设置</p>
    <div style="height:300px;position:relative;">
      <div id="mapContainer"></div>
      <div id="tip">
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="请输入关键字：(选定后搜索)"
          value
          onfocus="this.value=''"
        >
      </div>
    </div>
    <br>
  </div>
</template>
<script>
export default {
  props: {
    locationArray: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    locationArray(locationArray) {
      this.locationArray = locationArray;
      if (locationArray.length) {
        this.setMarkerEvent(locationArray);
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    setMarkerEvent(lonlat) {
      this.mapObj.remove(this.markers);
      var marker = new AMap.Marker({
        position: lonlat,
        map: this.mapObj
      });
      this.markers.push(marker);
      this.mapObj.setFitView();
    },
    initMap() {
      const self = this;
      //高德地图
      self.markers = [];
      self.mapObj = new AMap.Map("mapContainer", {
        resizeEnable: true,
        center: [116.397428, 39.90923], //地图中心点
        zoom: 11, //地图显示的缩放级别
        keyboardEnable: false
      });
      self.mapObj.on("click", function(e) {
        //alert('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');
        regeocoder(e.lnglat);
      });
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], function() {
        var autoOptions = {
          city: "北京", //城市，默认全国
          input: "keyword" //使用联想输入的input的id
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          city: "北京",
          map: self.mapObj
        });
        AMap.event.addListener(autocomplete, "select", function(e) {
          //TODO 针对选中的poi实现自己的功能
          placeSearch.search(e.poi.name, function(status, result) {
            if (status === "complete" && result.info === "OK") {
              keywordSearch_CallBack(result);
            }
          });
        });
      });
      function setAddressInfo(city, address, lng, lat) {
        console.log(city + "-" + address + "-" + lng + "-" + lat);
        // self.formData.address = address;
        // self.formData.city = city;
        // self.formData.gaoDeLon = lng;
        // self.formData.gaoDeLat = lat;
        self.$emit("locationChange", [lng, lat]);
      }
      function regeocoder(lnglat) {
        //逆地理编码
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            geocoder_CallBack(result, lnglat);
          }
        });
      }
      function geocoder_CallBack(data, lnglat) {
        //删除标点
        removeMarkes();

        var address = data.regeocode.formattedAddress; //返回地址描述
        var city =
          data.regeocode.addressComponent.city ||
          data.regeocode.addressComponent.province;

        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });

        var marker = new AMap.Marker({
          position: lnglat,
          map: self.mapObj
        });
        marker.city = city;
        marker.address = address;
        marker.content = "选中<<" + address + ">>地址!";
        marker.infoWindow = infoWindow;
        marker.on("click", markerClick);
        marker.emit("click", { target: marker });

        //Add marker
        self.markers.push(marker);

        self.mapObj.setFitView();
      }
      //标点信息
      function setView(lnglatArray) {
        var lnglats = lnglatArray;
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });
        for (var i = 0, marker; i < lnglats.length; i++) {
          var marker = new AMap.Marker({
            position: lnglats[i].location,
            map: self.mapObj
          });
          marker.city = lnglats[i].cityname;
          marker.address = lnglats[i].address;
          marker.content =
            "选中<<" + lnglats[i].name + lnglats[i].address + ">>为活动地址!";
          marker.infoWindow = infoWindow;
          marker.on("click", markerClick);
          marker.emit("click", { target: marker });

          //Add marker
          self.markers.push(marker);
          break;
        }
        self.mapObj.setFitView();
      }
      //标点点击信息
      function markerClick(e) {
        e.target.infoWindow.setContent(e.target.content);
        e.target.infoWindow.open(self.mapObj, e.target.getPosition());
        var address = e.target.address;
        var city = e.target.city;
        var lng = e.target.getPosition().lng;
        var lat = e.target.getPosition().lat;
        setAddressInfo(city, address, lng, lat);
      }
      //回调函数
      function keywordSearch_CallBack(data) {
        //删除标点
        removeMarkes();
        var lnglats = data.poiList.pois;
        setView(lnglats);
      }
      //删除标点
      function removeMarkes() {
        // for (var i = 0; i < markers.length; i += 1) {
        //   mapObj.remove(markers[i]);
        // }
        self.mapObj.remove(self.markers);
        self.markers = [];
      }
    }
  }
};
</script>
<style>
/* 高德地图样式 */
#tip {
  background-color: #fff;
  color: #333;
  border: 1px solid silver;
  box-shadow: 3px 4px 3px 0px silver;
  position: absolute;
  top: 10px;
  left: 10px;
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  line-height: 20px;
}

#tip input[type="text"] {
  height: 25px;
  border: 0;
  padding-left: 5px;
  width: 280px;
  border-radius: 3px;
  outline: none;
}

/* 高德地图样式 */
</style>
