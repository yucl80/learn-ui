import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three-css3d'
import { PlaneGeometry } from "three";
//import style from './App.css';

const style = {
    height: 760 // we can control scene size by setting container dimensions

};

class Test6 extends Component {
    containerWidth = 0;
    containerHeight = 0;

    // 列数
    colNum = 16;
    // 行数
    rowNum = 0;
    // 元素宽度，每个元素宽高相等
    itemWidth = 0;
    // 元素总数量
    allItemNum = 0;
    // 角度转弧度的系数
    degToRadianConstant = 0.017453293;
    // 页面展示的角度，此项目使用5个页面组成一个圆，因此计算每个页面所占据的角度
    pageDeg = 360 / 4;
    // 单列元素的弧度
    radian = 0;
    // 半径（坐标(0,0,0)到中心点在z轴上的产品图片的距离）
    radius = 0;
    // 1px 等于的弧度值
    pxToRadian = 0;

    dataList = [];

    // 容器元素class
    elementClass = 'box-border p-1'
    // 图片元素class
    imgClass =
        'rounded-md w-full h-full object-contain select-none relative cursor-pointer border-2 border-transparent'
    // 遮罩元素class
    maskClass = 'absolute z-10 top-0 bottom-0 left-0 right-0 cursor-grabbing'

    clientHeight = 0;
    clientWidth = 0;


    componentDidMount() {
        console.log("componentDidMount " + this);
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    computeCoordinate(pageIndex) {
        const coordinates = [];
        const { colNum, rowNum, allItemNum, itemWidth, pageDeg, degToRadianConstant, clientHeight, clientWidth, radian } = this;
        if (colNum === 0 || allItemNum === 0 || itemWidth === 0 || pageDeg === 0 || clientWidth === 0 || clientHeight === 0) {
            return coordinates
        }
        // 半径(取负数)
        const radius = -this.radius
        // 起始角度
        const startDeg = pageDeg * (0.5 - pageIndex) * degToRadianConstant - radian / 2
        // 起始坐标y = 容器高度 / 2 - 剩余高度 / 2 - 单个元素高度 / 2, 化简得到以下公式
        const positionY = (clientHeight - (clientHeight % itemWidth) - itemWidth) / 2
        for (let i = 0; i < colNum; i++) {
            const deg = startDeg - (i % colNum) * radian
            const x = radius * Math.sin(deg)
            let y = positionY
            const z = radius * Math.cos(deg)
            for (let j = 0; j < rowNum; j++) {
                y = positionY - j * itemWidth
                coordinates.push({
                    position: { x, y, z },
                    lookAt: { x: -2 * x, y, z: -2 * z },
                    deg
                })
            }
        }
        return coordinates
    }

    generateElement(item, coordiante, expand) {
        const { scene, itemWidth, elementClass, imgClass } = this
        if (!scene || itemWidth === 0 || !coordiante) {
            return
        }
        // 创建元素
        const element = document.createElement('div')
        element.className = elementClass
        element.style.cssText = `width:${expand * itemWidth}px;height:${expand * itemWidth}px;`
        element.dataset.stopautoplay = 'true'

        const { position, lookAt } = coordiante

        //element.style.lef = position.x;
        //element.style.top = position.y;


        // 创建图片
        const img = document.createElement('img')
        img.className = imgClass
        img.src = item.url
        img.style.cssText = `width:${expand * itemWidth}px;height:${expand * itemWidth}px;`
        img.draggable = false
        img.dataset.stopautoplay = 'true'
        img.dataset.isimg = 'true'

        element.appendChild(img)


        // 创建 CSS3D 对象
        const object = new CSS3DObject(element)
        object.position.set(position.x, position.y, position.z)
        // console.log(position);
        // 元素朝向
        const vector = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z)
        object.lookAt(vector)
        console.log(lookAt)
        scene.add(object)
    }

    createListView() {
        const { dataList } = this
        const dataLen = dataList.length
        if (dataLen === 0) {
            return
        }
        for (let i = 0; i < dataLen; i++) {
            const list = dataList[i]
            const listLen = list.length
            if (listLen <= 0) {
                continue
            }
            const coordiantes = this.computeCoordinate(i)
            // console.log(coordiantes);
            // 普通图处理       
            for (let j = 0; j < listLen; j++) {
                this.generateElement(list[j], coordiantes[j], 1)

            }
        }

    }

    setInfo(container, clientWidth, clientHeight, colNum, rowNum, allItemNum, itemWidth, dataList) {
        this.container = container;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;
        this.colNum = colNum;
        this.rowNum = rowNum;
        this.allItemNum = allItemNum;
        this.itemWidth = itemWidth;
        this.dataList = dataList;

    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        // this.dataList = [[{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" }],[{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }], [{ "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }], [{ "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" },{ "url": "Brian.png" }, { "url": "Brian.png" }, { "url": "Brian.png" }, { "url": "Brian.png" }, { "url": "Brian.png" }]]
        for (let i = 0; i < 5; i++) {
            let gg = [];
            for (let j = 0; j < 100; j++) {
                gg.push({ "url": "Brian.png" });
            }

            this.dataList.push(gg);
        }
        this.clientWidth = width;
        this.clientHeight = height;

        // 计算每个元素的宽度
        this.itemWidth = width / this.colNum;
        // 计算行数
        this.rowNum = Math.floor(height / this.itemWidth);
        // 每一页的商品数量
        this.allItemNum = this.colNum * this.rowNum;

        this.pageDeg = 360 / this.dataList.length;
        // 计算每个页面所占据的弧度
        this.radian = (this.pageDeg / this.colNum) * this.degToRadianConstant;
        // 计算半径
        this.radius = this.itemWidth / 2 / Math.tan(this.radian / 2);
        // 计算1px 的弧度值
        this.pxToRadian = (this.pageDeg / width) * this.degToRadianConstant;

        console.log("this.pxToRadian" + this.pxToRadian);
        console.log(this.rowNum);
        console.log(width + "  : " + height);

        this.scene = new THREE.Scene();

        /*
         this.camera = new THREE.PerspectiveCamera(
             75, // fov = field of view
             width / height, // aspect ratio
             0.1, // near plane
             1000 // far plane
         );*/

        const cameraToPlaneDistance = this.radius * Math.cos((this.pageDeg * this.degToRadianConstant - this.radian) / 2)
        const fov = Math.atan(height / 2 / cameraToPlaneDistance) * 2 * (180 / Math.PI);
        this.camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 2000);

        // this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.mount);
        // this.renderer = new THREE.WebGLRenderer();
        this.renderer = new CSS3DRenderer();

        this.renderer.setSize(width, height);
       // this.renderer.setPixelRatio(window.devicePixelRatio);
        this.mount.appendChild(this.renderer.domElement); // mount using React ref
    };

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
    addCustomSceneObjects = () => {
        console.log("addCustomSceneObjects");
        const plane = document.createElement("div");
        plane.style.width = this.clientWidth;
        plane.style.height = this.clientHeight;
        plane.style.position = "absolute";
        plane.style.cssText = `width:${this.width}px;height:${this.clientHeight}px;position:absolute;background-size:100% 100%;background-image:url("bg.jpg")`;
        const img = document.createElement('img')       
        img.src = "logo512.png";
        img.style.cssText = `width:${this.width}px;height:${this.clientHeight}px;`
        img.draggable = false       
        plane.appendChild(img)       
        // plane.style.opacity = 0.5;
         plane.style.background = "#ff0000";
       // const object = new CSS3DSprite(plane);
       // this.scene.add(object);
        
        //const dom = document.getElementsByClassName('plane')
        //dom[0].style.position= "absolute"
        const obj = new CSS3DObject(plane)
       // obj.position.set(0, 0, 0)
        // 平面默认是竖着的，需要放倒
        obj.rotateX(Math.PI / 2)
        // 添加到场景中
         
        const vector = new THREE.Vector3(119, -180, -2439)
        obj.lookAt(vector)      
        this.scene.add(obj)
        this.createListView();
        console.log("addCustomSceneObjects  complete");
        this.renderer.render(this.scene, this.camera);
    };

    startAnimationLoop = () => {

        // this.renderer.render(this.scene, this.camera);

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        // this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        console.log("render");
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

class Container extends React.Component {
    state = { isMounted: true };

    render() {
        const { isMounted = true } = this.state;
        return (
            <>
                <button onClick={() => this.setState(state => ({ isMounted: !state.isMounted }))}>
                    {isMounted ? "Unmount" : "Mount"}
                </button>
                {isMounted && <Test6 />}
                {isMounted && <div>Scroll to zoom, drag to rotate</div>}
            </>
        )
    }
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<Container />, rootElement);
//ReactDOM.createRoot( rootElement);
export default Test6;
