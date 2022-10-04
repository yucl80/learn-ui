import React, { Component } from "react";
import ReactDOM from "react-dom";

class TestD5 extends Component {
    wasmBinaryFile = "https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/graphvizlib.wasm";
    hpccWasm = null;   

    componentDidMount() {
        console.log(document.getElementById("graph"));
        console.log(this.mount);
        switch (window.location.hostname) {
            case "localhost":
                document.write('<script type="text/javascript" src="./dist/index.js"><'+'/script>');
                this.wasmBinaryFile = "./dist/graphvizlib.wasm";
                break;
            default:
                document.write('<script src="https://cdn.jsdelivr.net/npm/@hpcc-js/wasm/dist/index.min.js"><' + '/script>');
                break;
        }
        this.hpccWasm = window["@hpcc-js/wasm"];

        fetch(this.wasmBinaryFile, { credentials: 'same-origin' }).then(response => {
            if (!response.ok) {
                console.log("failed to load wasm binary file at '");
                throw "failed to load wasm binary file at '" + this.wasmBinaryFile + "'";

            }
            return response.arrayBuffer();
        }).then(wasmBinary => {
            console.log(wasmBinary);
            let hpccWasm = window["@hpcc-js/wasm"];
            hpccWasm.graphviz.layout(this.data(), "svg", "dot", { wasmBinary: wasmBinary }).then(svg => {
                const div = document.getElementById("root");
                console.log(div);
                //div.outerHTML = svg;
                //this.mount.appendChild(  );
                this.mount.innerHTML = svg;
                if (!svg) {
                    console.log("svg is null");
                }

            }).catch(err => console.error(err.message));
        });

    }
    render() {
        console.log(document.getElementById("root"));
        return (
            <div>
            <div ref={ref => (this.mount = ref)} />
            <div id="graph" />
            </div>
        )
    }
}

export default TestD5;