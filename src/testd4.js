import React, { Component } from "react";

//import * as _d3 from 'd3'
//import { graphviz } from 'd3-graphviz'
//import * as hpccWasm from "@hpcc-js/wasm";
//import { wasmFolder } from "@hpcc-js/wasm";
import html2canvas from "html2canvas";

class D3Viz1 extends Component {

    data() {
        const dot = `
            digraph G {
                node [shape=rect];

                subgraph cluster_0 {
                    style=filled;
                    color=lightgrey;
                    node [style=filled,color=white];
                    a0 -> a1 -> a2 -> a3;
                    label = "test Hello";
                }

                subgraph cluster_1 {
                    node [style=filled];
                    b0 -> b1 -> b2 -> b3;
                    label = "World";
                    color=blue
                }

                start -> a0;
                start -> b0;
                a1 -> b3;
                b2 -> a3;
                a3 -> a0;
                a3 -> end;
                b3 -> end;

                start [shape=Mdiamond];
                end [shape=Msquare];
            }
        `;
        return dot;
    }

    componentDidMount() {
        var wasmBinaryFile;
        switch (window.location.hostname) {
            case "localhost":
                // document.write('<script type="text/javascript" src="./index.min.js"><' + '/script>');
                wasmBinaryFile = "viz/graphvizlib.wasm";
                break;
            default:
                //document.write('<script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/index.min.js"><' + '/script>');
                wasmBinaryFile = "https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphvizlib.wasm";
                break;
        }

        fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(response => {
            if (!response.ok) {
                console.log("failed to load wasm binary file at '" + wasmBinaryFile + "'");
            }
            return response.arrayBuffer();
        }).then(wasmBinary => {
            let hpccWasm = window["@hpcc-js/wasm"];
            hpccWasm.graphviz.layout(this.data(), "svg", "dot", { wasmBinary: wasmBinary }).then(svg => {
                // this.mount.innerHTML = svg;
                var img = new Image();
                var svgData = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
                var DOMURL = URL || window.webkitURL;
                var url = DOMURL.createObjectURL(svgData);
                img.src = url;
                //document.getElementById('placeholder').appendChild(img);
                img.onload = function () {
                    var canvas = document.getElementById('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    console.log(img.width);

                    const fakeLink = window.document.createElement("a");
                    fakeLink.style = "display:block;";
                    fakeLink.innerText = "download";
                    fakeLink.download = "image1.png";
                    fakeLink.href = canvas.toDataURL("image/png", 1.0);
                    document.getElementById('placeholder').appendChild(fakeLink);

                    const exportAsImage = async (el, imageFileName) => {
                        const canvas = await html2canvas(document.getElementById('pp'));
                        const image = canvas.toDataURL("image/png", 1.0);
                        const fakeLink = window.document.createElement("a");
                        fakeLink.style = "display:block;";
                        fakeLink.download = "test.png";
                        fakeLink.innerText = "download2";
                        fakeLink.href = image;
                        document.getElementById('root').appendChild(fakeLink);

                    };
                    exportAsImage();
                };

            }).catch(err => console.error(err.message));
            // })

        });


    }



    render() {
        const script = document.createElement('script');
        script.src = './viz/index.min.js';
        document.head.append(script);
       
        return (
            <div id="pp" ref={ref => (this.pp = ref)}>
                <div >
                    <canvas id="canvas"  >
                    </canvas>
                </div>
                <div id="placeholder"></div>
                <div id="placeholder2"></div>
                <div id="placeholder2b"></div>
                <div id="placeholder3"></div>
                <div id="placeholder4"></div>
                <div ref={ref => (this.mount = ref)} />
            </div>

        )
    }
}
export default D3Viz1;