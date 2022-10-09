import React, { Component } from 'react'

import * as d3             from 'd3'
import * as d3Graphviz     from 'd3-graphviz'
const _ = d3Graphviz.graphviz;
class D3graphviz extends Component {  
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.divRef = React.createRef();
    
  }

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
        wasmBinaryFile = "static/js/graphvizlib.wasm";
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
      //  const xd3 = Object.assign({ graphviz }, d3);
       // console.log(xd3);
       
        d3.select("#graph").graphviz().renderDot('digraph  {a -> b}');

       //d3.graphviz("#placeholder").renderDot(this.data());

      }).catch(err => console.error(err.message));
      // })

    });


  }



  render() {

    const script1 = document.createElement('script');
    script1.src = "https://d3js.org/d3.v5.js";
    document.head.append(script1);


    const script2 = document.createElement('script');
    script2.src = '/static/js/index.min.js';
    document.head.append(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://unpkg.com/d3-graphviz@3.0.5/build/d3-graphviz.js';
    document.head.append(script3);

   

    return (
      <div  >
        <div ref={this.divRef}>
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
export default D3graphviz;