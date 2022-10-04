import React, { Component } from "react";
//import * as _d3 from 'd3'
import { graphviz } from 'd3-graphviz'
//import * as hpccWasm from "@hpcc-js/wasm";



class D3Viz extends Component {

    componentDidMount() {

        console.log("componentDidMount");
        let script = document.createElement("script");
        //script.src="viz/index.min.js";
        script.src = 'viz/index.min.js';
        script.type = "javascript/worker";
        document.getElementById('root').appendChild(script);


        let script2 = document.createElement("script");
        script2.src = "viz/graphviz.js";
        // script2.type="javascript/worker";
        document.getElementById('root').appendChild(script2);


        // let script3 = document.createElement("script");
        //script3.src="https://unpkg.com/d3-graphviz@3.0.5/build/d3-graphviz.js";
        // script3.type="javascript/worker";
        // document.getElementById('root').appendChild(script3);
       


        //wasmFolder("./");
        //const d3 = Object.assign({ graphviz }, _d3);

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
      

        graphviz("#graph1").dot(dot).render();      
        
    }

    render() {

        console.log("render");
        return (
            <div>
                <div id="graph"></div>
                <div id="graph1"></div>
            </div>
        )

    }
}
export default D3Viz;