(function (window) {
    
    // Display
    window.__env.display.bottomContainer = false;
    window.__env.display.featuresCarouselTmpl = null;
    window.__env.display.similarFeatures = true;
    window.__env.display.changeCatalog = false;
    window.__env.display.cart = false;
    window.__env.display.hint = true;
    window.__env.display.changeOAPIP = false;
    window.__env.header.display = false;
    
    // Autoload first mappable asset in map
    window.__env.assets.autoLoadMappableInMap = true;
    
    window.__env.detectLanguage = false;
    window.__env.translations = {
        en: { 
            "index.title": "Plastic Viewer",
            "plastic.aoi": "Area of interest",
            "plastic.origin": "Plastic origin",
            "plastic.destination": "Plastic destination",
            "draw.help": "Click to set the location center. Click again to set the circle radius",
            
        }
    };

    window.__env.plastic = {
        endPoint:'https://project-infra-251589-0.lab.dive.edito.eu',
        defaultDate:"2017-01-01",
        dates:[
            "2017-01-01",
            "2017-02-01",
            "2017-03-01",
            "2017-04-01",
            "2017-05-01",
            "2017-07-01",
            "2017-08-01",
            "2017-09-01",
            "2017-10-01",
            "2017-11-01",
            "2017-12-01",
            "2018-01-01",
            "2018-02-01",
            "2018-03-01",
            "2018-04-01",
            "2018-05-01",
            "2018-07-01",
            "2018-08-01",
            "2018-09-01",
            "2018-10-01",
            "2018-11-01",
            "2018-12-01",
            "2019-01-01",
            "2019-02-01",
            "2019-03-01",
            "2019-04-01",
            "2019-05-01",
            "2019-07-01",
            "2019-08-01",
            "2019-09-01",
            "2019-10-01",
            "2019-11-01",
            "2019-12-01"
        ]
    };
 
    window.__env.defaultRoute = "map";
    window.__env.mapPage.templateUrl = 'app/addons/plastic/plastic_map.html';


    // Authentication
    window.__env.auth.strategy = "none";
    
    // No STAC endpoint
    window.__env.endPoints = [
        /*{
            url: "http://localhost:5554",
            options: {
                isRemovable: false,
                display:'heatmap',
                ol:{
                    blur: parseInt(10),
                    radius: parseInt(8),
                    weight: function (feature) {
                        return feature.getProperties().total_normalized_log;
                    }
                }
            }
        }*/ 
        /*{
            url: "http://localhost:5554",
            options: {
                isRemovable: false,
                display:'heatmap',
                ol:{
                    blur: parseInt(10),
                    radius: parseInt(8),
                    weight: function (feature) {
                        return feature.getProperties().total_normalized_log;
                    }
                },
                style: function(feature, resolution) {
                    var total_normalized = feature.getProperties().total_normalized_log;
                    return [
                        new window.ol.style.Style({
                            stroke: new window.ol.style.Stroke({
                                width: Math.round(total_normalized * 7),
                                color: (function(total_normalized) {
                                    if (total_normalized < 0.2) {
                                        return 'rgba(80, 242, 218, 0.4)';
                                    }
                                    else if (total_normalized >= 0.2 && total_normalized < 0.4) {
                                        return 'rgba(61, 153, 112, 0.5)';
                                    }
                                    else if (total_normalized >= 0.4 && total_normalized < 0.6) {
                                        return 'rgba(153, 144, 61, 0.6)';
                                    }
                                    else if (total_normalized >= 0.6 && total_normalized < 0.8) {
                                        return 'rgba(227, 146, 25, 0.7)';
                                    }
                                    else if (total_normalized >= 0.8) {
                                        return 'rgba(242, 93, 80, 0.8)';
                                    }
                                })(total_normalized)
                            })
                        })
                    ]
                }
            }
        }*/
    ];

    // Map 3D
    window.__env.map.maxExtent = "EARTH_EXTENT";
    window.__env.map.logo.title = "EDITO";
    window.__env.map.logo.img = "assets/img/EDITO_logo_EU_Flag_Negative.png";
    window.__env.map.logo.url = "https://dive.edito.eu";
    window.__env.map.logo.inputClass = "map-header";
    window.__env.map.footer.bgcolor = "rgba(0,0,0,0.7)";
    window.__env.map.selectHitTolerance = 10;
    
    
    // Gazetteers
    window.__env.planets.earth.gazetteer.url =
        "https://catalog.dive.edito.eu/gazetteer/default";
    window.__env.planets.earth.layers = [
         /*{
            id: "label",
            title: "Road (light)",
            thumbnail: "assets/img/backgrounds/roadlight.png",
            color: "light",
            type: "stamen",
            isBackground: true,
            group: "Permanent",
            visible: true,
            options: {
                layer: "alidade_smooth_dark",
                retina: true,
                wrapX: true
            }
        },*/
        {
            id: "VIIRS_Black_Marble",
            title: "Night",
            thumbnail: "assets/img/backgrounds/VIIRS_Black_Marble.png",
            color: "dark",
            type: "xyz",
            format: 'png',
            tileMatrix: 8,
            time: '2016-01-01',
            isBackground: true,
            group: "Permanent",
            visible: false,
            options: {
                url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/{:id:}/default/{:time:}/GoogleMapsCompatible_Level{:tileMatrix:}/{z}/{y}/{x}.{:format:}',
                attributions: '{:id:} - <a href="https://earthdata.nasa.gov/about/science-system-description/eosdis-components/global-imagery-browse-services-gibs">NASA EOSDIS GIBS</a>',
                wrapX: true
            }
        },
        {
            id: "bigemitters",
            title: "Largest emissions",
            type: "GeoJSON",
            isBackground: false,
            zIndex:10,
            isHoverable: true,
            visible:false,
            style: function(feature, resolution) {
                var absolutMin = 50;
                var absolutMax = 8680; // select id,leb2019,mei2021 from trajectory order by mei2021 DESC LIMIT 5;
                var sum = feature.getProperties().leb2019 + feature.getProperties().mei2021;
                var radius = Math.abs(Math.round(((Math.log(sum + 1) - Math.log(absolutMin + 1)) / (Math.log(absolutMax + 1) - Math.log(absolutMin + 1))) * 15));
                var color = feature.getProperties().leb2019 > feature.getProperties().mei2021 ? 'rgb(12, 139, 242)' : 'rgb(105, 207, 103)';
                var fillColor = feature.getProperties().leb2019 > feature.getProperties().mei2021 ? 'rgba(12, 139, 242, 0.6)' : 'rgba(105, 207, 103, 0.6)';
                return [
                    new window.ol.style.Style({
                        image: new window.ol.style.Circle({
                            radius: radius,
                            stroke: new window.ol.style.Stroke({
                                color: color
                            }),
                            fill: new window.ol.style.Fill({
                                color: fillColor
                            })
                        })
                    })
                ]
            },
            options:{
                url: 'https://project-infra-251589-0.lab.dive.edito.eu/maxInTime',
            }
        }
        /*,
        {
            id: "AerialWithLabelsOnDemand",
            title: "Aerial with labels",
            thumbnail: "assets/img/backgrounds/aerialwithlabels.png",
            type: "bing",
            isBackground: true,
            options: {
                imagerySet: "AerialWithLabelsOnDemand",
                visible: false,
                wrapX: true,
            },
        },
        {
            id: "Plastic",
            title: "Plastic",
            type: "tilewms",
            options:{
                url: 'http://localhost:8282/plastic?layers=particles&FORMAT=image/png',
                wrapX: true,
                visible:false
            }
        },
        {
            id: "SeaWaterTemperature",
            title: "Sea Water Temperature",
            type: "wmts",
            isBackground: false,
            group: "Permanent",
            options: {
                url: 'https://wmts.marine.copernicus.eu/teroWmts/GLOBAL_ANALYSISFORECAST_PHY_001_024/cmems_mod_glo_phy-thetao_anfc_0.083deg_P1D-m_202211',
                wrapX: true,
                visible: false
            }
        },
        {
            id: "Plastic",
            title: "Plastic",
            type: "mvt",
            isBackground: false,
            group: "Permanent",
            zIndex:10,
            ol:{
                maxZoom:19,
                minZoom:10
            },
            options:{
                url: 'http://localhost:8000/tiles/{z}/{x}/{y}.mvt',
                visible: false
            }
        },
        {
            id: "EmissionDensity",
            title: "Density of plastic emission",
            type: "GeoJSON",
            isBackground: false,
            group: "Permanent",
            zIndex:10,
            // Show GeoJSON as HeatMap
            display: "heatmap",
            ol:{
                blur: parseInt(10),
                radius: parseInt(2),
                weight: function (feature) {
                    return feature.getProperties().total_normalized_log;
                }
            },
            options:{
                url: 'http://localhost:5554/max?limit=10000&target=start&intersects=POLYGON((-104.4593+67.2764,48.1046+67.6806,38.0092+-14.1819,-104.4883+-17.2052,-104.4593+67.2764))',
                visible: false
            }
        }*/
    ];
    
})(this);
