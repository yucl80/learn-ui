import React, { Component } from 'react'
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

class test3 extends Component {


  componentDidMount(){
    cytoscape.use( dagre );

    var cy = window.cy = cytoscape({
      container: document.getElementById('testdiv'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#11479e'
           
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,          
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        }
      ],

      elements: {
        nodes: [
          { data: { id: 'n0' } },
          { data: { id: 'n1' } },
          { data: { id: 'n2' } },
          { data: { id: 'n3' } },
          { data: { id: 'n4' } },
          { data: { id: 'n5' } },
          { data: { id: 'n6' } },
          { data: { id: 'n7' } },
          { data: { id: 'n8' } },
          { data: { id: 'n9' } },
          { data: { id: 'n10' } },
          { data: { id: 'n11' } },
          { data: { id: 'n12' } },
          { data: { id: 'n13' } },
          { data: { id: 'n14' } },
          { data: { id: 'n15' } },
          { data: { id: 'n16' } }
        ],
        edges: [
          { data: { source: 'n0', target: 'n1' } },
          { data: { source: 'n1', target: 'n2' } },
          { data: { source: 'n1', target: 'n3' } },
          { data: { source: 'n3', target: 'n5' } },
          { data: { source: 'n4', target: 'n6' } },
          { data: { source: 'n13', target: 'n1' } },
          { data: { source: 'n6', target: 'n8' } },
          { data: { source: 'n8', target: 'n5' } },
          { data: { source: 'n13', target: 'n2' } },
          { data: { source: 'n14', target: 'n3' } },
          { data: { source: 'n3', target: 'n13' } },
          { data: { source: 'n13', target: 'n14' } },
          { data: { source: 'n13', target: 'n3' } },
        ]
      }
    });
    cy.layout({ name: 'dagre',fit:true }).run()
    document.getElementById('testdiv').getElementsByTagName('div')[0].style.height='1000px';
    console.log("run");
  }

  

  render() {
    
    return (
      <div id="cy" style={{height:'100%',width:'100%'}}>
       
      </div>
    );
  }
}

export default test3
