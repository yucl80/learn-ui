import React, { Component } from "react";
import * as hpccWasm from "@hpcc-js/wasm";


class Viz extends Component {
    componentDidMount() {
        const dot = `
            digraph G {
                node [shape=rect];

                subgraph cluster_0 {
                    style=filled;
                    color=lightgrey;
                    node [style=filled,color=white];
                    a0 -> a1 -> a2 -> a3;
                    label = "asdasdasdfa";
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
        //var hpccWasm = window["@hpcc-js/wasm"];
        //var hpccWasm = window["@hpcc-js/wasm"];
        // Asynchronous call to layout
        hpccWasm.graphviz.layout(dot, "svg", "dot").then(svg => {
            const div = document.getElementById("placeholder");
            div.innerHTML = svg;
        });

        hpccWasm.graphvizSync().then(graphviz => {
            const div = document.getElementById("placeholder2");
            // Synchronous call to layout
            div.innerHTML = graphviz.layout(dot, "svg", "dot");
        });
    }

    render() {
        return (
            <div>
                <script src="https://unpkg.com/@hpcc-js/wasm/dist/index.min.js" type="javascript/worker"></script>
                <div id="placeholder"></div>
                <div id="placeholder2"></div>
            </div>
        )

    }
}
export default Viz;