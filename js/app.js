require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/layers/MapImageLayer",
    "esri/Basemap",
    "esri/config",
    "esri/widgets/Home"
  ], function(
    Map, MapView, ScaleBar, Legend, Search, 
    LayerList, BasemapGallery, FeatureLayer, 
    MapImageLayer, Basemap, esriConfig,Home
  ) {
    
    // 可选: 配置API密钥以访问高级服务
    // esriConfig.apiKey = "YOUR_API_KEY";
    
    // 创建地图
    const map = new Map({
      basemap: "streets-navigation-vector"
    });
    
    // 添加一个ArcGIS Online发布的专题图层 - 这里使用世界城市人口图层
    /*const citiesLayer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/World_Cities/FeatureServer/0",
      title: "世界主要城市",
      popupTemplate: {
        title: "{CITY_NAME}",
        content: [{
          type: "fields",
          fieldInfos: [
            { fieldName: "POPULATION", label: "人口" },
            { fieldName: "COUNTRY", label: "国家" },
            { fieldName: "CONTINENT", label: "大洲" }
          ]
        }]
      }
    });
    
    map.add(citiesLayer);*/
  // 添加京津冀要素图层（替换地震图层）
  // 添加所有子图层（假设有3个子图层）
  const layer0 = new FeatureLayer({
    url: "https://www.geosceneonline.cn/server/rest/services/Hosted/京津冀相关数据2/FeatureServer",
    title: "京津冀城镇中心位置",
    visible: true // 默认显示
  });

  const layer1 = new FeatureLayer({
    url: "https://www.geosceneonline.cn/server/rest/services/Hosted/京津冀相关数据2/FeatureServer/1",
    title: "2010年城镇建设用地",
    visible: true // 默认隐藏
  });

  const layer2 = new FeatureLayer({
    url: "https://www.geosceneonline.cn/server/rest/services/Hosted/京津冀相关数据2/FeatureServer/2",
    title: "2049_highspeed城镇建设用地布局",
    visible: true
  });
  const layer3 = new FeatureLayer({
    url: "https://www.geosceneonline.cn/server/rest/services/Hosted/京津冀相关数据2/FeatureServer/3",
    title: "京津冀PM2.5浓度",
    visible: true
  });
  // 批量添加到地图
  // 先添加的图层在底部

map.add(layer3, 1);map.add(layer2, 2);map.add(layer1, 3);  map.add(layer0,4);


    // 添加一个自采集数据发布的图层 - 这里使用示例地震数据
    /*const earthquakesLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0",
      title: "1970年以来的地震",
      opacity: 0.7
    });
    
    map.add(earthquakesLayer);*/
    
    // 创建视图
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [116.4, 39.2],  // 北京中心坐标
      zoom: 6                 // 适合京津冀范围的缩放级别
    });
    
    // 添加比例尺微件
    const scaleBar = new ScaleBar({
      view: view,
      unit: "metric"
    });
    
    view.ui.add(scaleBar, {
      position: "bottom-left"
    });
    
    // 添加搜索微件
    const searchWidget = new Search({
      view: view,
      container: "searchWidget"
    });
    
    // 添加图例微件
    const legend = new Legend({
      view: view,
      container: "legendWidget"
    });
    
    // 添加图层列表微件
    const layerList = new LayerList({
      view: view,
      container: "layerListWidget"
    });
    
    // 添加底图库微件
    const basemapGallery = new BasemapGallery({
      view: view,
      container: "basemapGallery",
      source: {
        query: {
          title: '"World Basemaps" AND owner:esri'
        }
      }
    });
    const homeWidget = new Home({
      view: view
    });
    view.ui.add(homeWidget, "top-left");
    
    // 视图加载完成后执行
    view.when(() => {
      console.log("地图和视图加载完成");
    });
  });