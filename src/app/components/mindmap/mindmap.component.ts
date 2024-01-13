// Import statements
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Edge, GraphComponent, Layout, Node } from '@swimlane/ngx-graph';
import { LayoutMindMap, MindMap, MyLink, MyNode } from 'src/app/interfaces/mindmap.interface';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';
import { MindMapperResponse } from '../../model/mind-map.api.interfaces';
import { Workspace } from 'src/app/dashboard/dashboard.component';

// Component Decorator with metadata
@Component({
  selector: 'app-mindmap',
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css', './mindmap2.component.css']
})
export class MindmapComponent implements OnInit, AfterViewInit {
  // Properties
  width = 100; // 100% of the viewport width
  height = 80; // 80% of the viewport height
  nodes: MyNode[] = [];
  links: MyLink[] = [];
  layout: string | Layout = 'dagre';
  idCounter = 0; // Counter for unique IDs
  mindMaps: MindMap[] = [];
  layoutsMindMapper: LayoutMindMap[] = [];
  showTags = true;
  form: FormGroup;
  public jsonData: any; // JSON data property
  @ViewChild(GraphComponent) graphComponent?: GraphComponent;
  zoomLevel = 0.5;
  zoomStep = 0.1;
  showDropdown: string | null = null;

  // Constructor
  constructor(
    public dialog: MatDialog,
    private appContext: AppContext,
    private openaiService: OpenaiService
  ) {
    this.form = new FormGroup({
      userInput: new FormControl(''),
      workflow: new FormControl(''),
      tone: new FormControl(''),
    });
    this.jsonData = {
      "title": "assumeUTXO",
      "summary": "assumeUTXO is a tool used in Bitcoin development to simulate the state of the Unspent Transaction Output (UTXO) set.",
      "details": [
        {
          "title": "Simulating UTXO Set",
          "explanations": [
            "The UTXO set represents all the unspent transaction outputs in the Bitcoin network.",
            "assumeUTXO is a tool that allows developers to create a simulated UTXO set for testing purposes.",
            "This tool helps developers analyze and understand the behavior of their code without interacting with the real Bitcoin network."
          ]
        },
        {
          "title": "Testing Bitcoin Code",
          "explanations": [
            "assumeUTXO is particularly useful for testing Bitcoin code that relies on the state of the UTXO set.",
            "Developers can use assumeUTXO to create specific scenarios and test how their code handles different UTXO states.",
            "By simulating different UTXO sets, developers can ensure their code functions correctly in various scenarios."
          ]
        },
        {
          "title": "Debugging and Optimization",
          "explanations": [
            "assumeUTXO can also be used for debugging and optimizing Bitcoin code.",
            "Developers can simulate specific UTXO sets to identify potential issues or bottlenecks in their code.",
            "By analyzing the behavior of their code with different UTXO sets, developers can make improvements and optimize performance."
          ]
        }
      ]
    }
  }

  // Lifecycle hooks
  ngOnInit(): void {
    // Mind Map initialization logic
    const mindMapData = this.jsonData; // Simplified data retrieval logic
    if (mindMapData) {
      this.jsonData = mindMapData; // Assign the dynamic data to the jsonData property
      const graphData = this.transformToGraphData(this.jsonData);
      this.nodes = graphData.nodes;
      this.links = graphData.links;

      this.mindMaps = [
        {
          title: 'Mind Map 1',
          imageUrl: 'assets/btcIllustrated/mindmap/test.png',
          tag: 'AssumeUTXO'
        },
        {
          title: 'Mind Map 2',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          imageUrl: 'assets/btcIllustrated/mindmap/test2.png',
          tag: 'Segwit'
        },
        {
          title: 'Mind Map 3',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          imageUrl: 'assets/btcIllustrated/mindmap/test3.png',
          tag: 'CTV'
        }
        // ...add more if needed
      ];


    } else {
      console.error('No data available for the Mind Map');
    }
  }

  ngAfterViewInit(): void {
    this.graphComponent?.zoomTo(this.zoomLevel);
  }

  // Methods
  submitData(): void {
    // Form submission logic
  }

  private generateId(): string {
    return `node-${this.idCounter++}`;
  }

  private transformToGraphData(jsonData: any): { nodes: MyNode[], links: MyLink[] } {
    const nodes: MyNode[] = [];
    const links: MyLink[] = [];
    let estimatedHeight = this.estimateHeight(jsonData.title, 300);

    debugger 
    const rootNode: MyNode = {

      id: this.generateId(),
      label: jsonData.title,
      data: { summary: jsonData.summary },
      fixedWidth: 300, // Set this to your desired width
      dynamicHeight: estimatedHeight + 40, // Set the estimated height
      level: 0
    };
    nodes.push(rootNode);

    // Create Summary Node
    const summaryNode: MyNode = {
      id: this.generateId(),
      label: 'Summary\n' + jsonData.summary, // Add the summary text here
      data: { summary: jsonData.summary },
      fixedWidth: 400, // Width can be adjusted as needed
      dynamicHeight: this.estimateHeight('Summary\n' + jsonData.summary, 200), // Adjust the estimateHeight call as needed
      level: 1 // New intermediate level
    };
    nodes.push(summaryNode);

    // Create Section Node
    const sectionNode: MyNode = {
      id: this.generateId(),
      label: 'Sections\n', // Add the summary text here
      data: { section: "Sections" },
      fixedWidth: 400, // Width can be adjusted as needed
      dynamicHeight: this.estimateHeight('Sections\n', 200) + 50, // Adjust the estimateHeight call as needed
      level: 1 // New intermediate level
    };
    nodes.push(sectionNode);

    // Create References Node with dummy data
    const referencesNode: MyNode = {
      id: this.generateId(),
      label: 'References\n1. Bitcoin Whitepaper\n2. Satoshi Nakamoto’s Forum Posts\n3. Other Relevant Research', // Replace with actual references
      data: { explanations: 'References\n1. Bitcoin Whitepaper\n2. Satoshi Nakamoto’s Forum Posts\n3. Other Relevant Research' },
      fixedWidth: 400, // Width can be adjusted as needed
      dynamicHeight: this.estimateHeight('References\n1. Bitcoin Whitepaper\n2. Satoshi Nakamoto’s Forum Posts\n3. Other Relevant Research', 200), // Adjust the estimateHeight call as needed
      level: 1 // New intermediate level
    };
    nodes.push(referencesNode);

    links.push({
      id: this.generateId(),
      source: rootNode.id,
      target: summaryNode.id,
      label: '' // Optional: add a label if needed
    });
    links.push({
      id: this.generateId(),
      source: rootNode.id,
      target: referencesNode.id,
      label: '' // Optional: add a label if needed
    });
    links.push({
      id: this.generateId(),
      source: rootNode.id,
      target: sectionNode.id,
      label: '' // Optional: add a label if needed
    });

    jsonData.details.forEach((detail: any) => {
      let estimatedHeight = this.estimateHeight(detail.title, 200);

      const detailNode: MyNode = {
        id: this.generateId(),
        label: detail.title,
        data: { explanations: detail.explanations },
        fixedWidth: 400, // Set this to your desired width
        dynamicHeight: estimatedHeight + 40, // Set the estimated height
        level: 2 // Now this is level 2
      };
      nodes.push(detailNode);

      links.push({
        id: this.generateId(),
        source: sectionNode.id, // Changed from rootNode.id to summaryNode.id
        target: detailNode.id,
        label: '' // Optional: add a label if needed
      });

      detail.explanations.forEach((exp: any) => {
        let estimatedHeight = this.estimateHeight(exp, 500) + 40;

        const explanationNode: MyNode = {
          id: this.generateId(),
          label: exp,
          data: {},
          fixedWidth: 500, // Set this to your desired width
          dynamicHeight: estimatedHeight, // Set the estimated height
          level: 3
        };
        nodes.push(explanationNode);

        links.push({
          id: this.generateId(),
          source: detailNode.id,
          target: explanationNode.id
        });
      });
    });

    return { nodes, links };
  }
  calculateCustomPath(link: MyLink): string {
    // Get the source and target nodes based on the IDs in the link
    const sourceNode = this.nodes.find(node => node.id === link.source);
    const targetNode = this.nodes.find(node => node.id === link.target);

    // Calculate the start and end points for the path
    const startPoint = {
      x: (sourceNode?.position?.x ?? 0) + (sourceNode?.dimension?.width ?? 0),
      y: (sourceNode?.position?.y ?? 0) + (sourceNode?.dimension?.height ?? 0) / 2,
    };

    // const startPoint = {
    //   x: sourceNode.position.x + sourceNode.dimension.width,
    //   y: sourceNode.position.y + sourceNode.dimension.height / 2
    // };
    const endPoint = {
      x: (targetNode?.position?.x ?? 0),
      y: (targetNode?.position?.y ?? 0) + (targetNode?.dimension?.height ?? 0) / 2
    };

    // Calculate control points for the curve
    const controlPoint1 = { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y };
    const controlPoint2 = { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y };

    // Create a path string for the SVG 'path' element with a cubic Bezier curve
    return `M${startPoint.x},${startPoint.y} C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}`;
  }


  private estimateHeight(text: string, nodeWidth: number): number {
    const lineHeight = 20; // Set an approximate line height
    const charsPerLine = nodeWidth / 10; // Estimate chars per line based on an average character width
    const lineCount = Math.ceil(text.length / charsPerLine);
    if (lineCount == 1) {
      return 40
    }
    return lineCount * lineHeight;
  }




  toggleDropdown(dropdownKey: string) {

    this.showDropdown = this.showDropdown === dropdownKey ? null : dropdownKey;
  }

  selectDropdownOption(dropdownKey: string, option: string) {


    const control = this.form.get(dropdownKey);
    if (control) {
      control.setValue(option);
    }
    this.showDropdown = null; // Hide dropdown after selection
  }


  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, 2); // max zoom level 2
    this.graphComponent?.zoomTo(this.zoomLevel);
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, 0.5); // min zoom level 0.5
    this.graphComponent?.zoomTo(this.zoomLevel);
  }

  truncateUrl(url: string, length: number): string {
    if (url.length > length) {
      return url.substring(0, length) + '...';
    }
    return url;
  }

}
