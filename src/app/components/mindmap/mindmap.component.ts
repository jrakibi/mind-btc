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
      "topic": {
        "id": "derivation_path_bitcoin",
        "name": "Derivation Path in Bitcoin",
        "summary": "A derivation path is a crucial component in Bitcoin wallets, determining how individual addresses are generated from a master seed. It's part of the hierarchical deterministic (HD) wallet structure, allowing for organized and secure management of multiple Bitcoin addresses and keys.",
        "subtopics": [
          {
            "id": "hd_wallets_basics",
            "name": "Basics of Hierarchical Deterministic (HD) Wallets",
            "points": [
              {
                "id": "hd_wallets_definition",
                "name": "Definition of HD Wallets",
                "details": [
                  "HD wallets generate a hierarchical tree-like structure of keys from a single master seed.",
                  "This structure enhances security and privacy by enabling the generation of new addresses for each transaction."
                ],
                "references": []
              },
              {
                "id": "master_seed_role",
                "name": "Role of Master Seed",
                "details": [
                  "The master seed is a 128-bit to 256-bit random number, often represented as a mnemonic phrase.",
                  "It is the root from which all private and public keys are derived in an HD wallet."
                ],
                "references": []
              }
            ],
            "references": []
          },
          {
            "id": "derivation_paths_understanding",
            "name": "Understanding Derivation Paths",
            "points": [
              {
                "id": "derivation_path_definition",
                "name": "Definition and Structure",
                "details": [
                  "A derivation path specifies the route taken through the hierarchical tree to derive a particular key or address.",
                  "The path is typically noted in a format like m/44'/0'/0'/0/0."
                ],
                "references": []
              },
              {
                "id": "derivation_path_components",
                "name": "Components of a Derivation Path",
                "details": [
                  {
                    "id": "purpose_field",
                    "name": "Purpose Field",
                    "details": [
                      "Typically set to 44', adhering to BIP44 standards.",
                      "Indicates the type of wallet, such as multi-currency or Bitcoin-specific."
                    ],
                    "references": []
                  },
                  {
                    "id": "coin_type",
                    "name": "Coin Type",
                    "details": [
                      "Specifies the cryptocurrency, with 0' for Bitcoin.",
                      "Allows for multi-currency HD wallets."
                    ],
                    "references": []
                  },
                  {
                    "id": "account",
                    "name": "Account",
                    "details": [
                      "Differentiates between multiple accounts for the same coin type.",
                      "Allows users to separate funds for different purposes."
                    ],
                    "references": []
                  },
                  {
                    "id": "change",
                    "name": "Change",
                    "details": [
                      "Distinguishes between external addresses (0) used for receiving funds and internal (1) for change and transaction linking.",
                      "Enhances privacy by separating transaction types."
                    ],
                    "references": []
                  },
                  {
                    "id": "address_index",
                    "name": "Address Index",
                    "details": [
                      "Represents the individual addresses generated under the account.",
                      "Sequentially increases as new addresses are required."
                    ],
                    "references": []
                  }
                ],
                "references": []
              }
            ],
            "references": []
          }
        ],
        "references": [
          "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
          "https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki"
        ]
      }
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
    let estimatedHeight: number;

    // Root Node
    const rootNode: MyNode = {
      id: this.generateId(),
      label: jsonData.topic.name,
      data: {},
      fixedWidth: 450,
      // dynamicHeight: this.estimateHeight(jsonData.topic.name, 300),
      dynamicHeight: 170,
      level: 0
    };
    nodes.push(rootNode);

    // Summary Node
    const summaryNode: MyNode = {
      id: this.generateId(),
      label: 'Summary',
      data: { summary: jsonData.topic.summary },
      fixedWidth: 400,
      dynamicHeight: this.estimateHeight(jsonData.topic.summary, 450),
      level: 1
    };
    nodes.push(summaryNode);
    links.push({ id: this.generateId(), source: rootNode.id, target: summaryNode.id });

    // Sections Node
    const sectionNode: MyNode = {
      id: this.generateId(),
      label: 'Sections',
      data: {},
      fixedWidth: 400,
      dynamicHeight: 130, // Adjust as needed
      level: 1
    };
    nodes.push(sectionNode);
    links.push({ id: this.generateId(), source: rootNode.id, target: sectionNode.id });

    // References Node
    const referencesNode: MyNode = {
      id: this.generateId(),
      label: 'References',
      data: { references: jsonData.topic.references },
      fixedWidth: 400,
      dynamicHeight: this.estimateHeight(jsonData.topic.references.join('\n'), 400),
      level: 1
    };
    nodes.push(referencesNode);
    links.push({ id: this.generateId(), source: rootNode.id, target: referencesNode.id });

    // Iterate over sections and create nodes
    jsonData.topic.subtopics.forEach((section: any) => {
      const sectionSubNode: MyNode = {
        id: this.generateId(),
        label: section.name,
        data: {},
        fixedWidth: 400,
        dynamicHeight: this.estimateHeight(section.name, 400),
        level: 2
      };
      nodes.push(sectionSubNode);
      links.push({ id: this.generateId(), source: sectionNode.id, target: sectionSubNode.id });

      // Iterate over points in each section
      section.points.forEach((point: any) => {
        estimatedHeight = this.estimateHeight(point.name, 300);
        const pointNode: MyNode = {
          id: this.generateId(),
          label: point.name,
          data: { details: point.details },
          fixedWidth: 300,
          dynamicHeight: estimatedHeight,
          level: 3
        };
        nodes.push(pointNode);
        links.push({ id: this.generateId(), source: sectionSubNode.id, target: pointNode.id });

        // If point has subpoints, create nodes for them
        point.details.forEach((detail: any, index: number) => {
          if (typeof detail === 'string') {
            // Handle case where detail is a string
            const detailNode: MyNode = {
              id: this.generateId(),
              label: detail,
              data: {},
              fixedWidth: 300,
              dynamicHeight: this.estimateHeight(detail, 300),
              level: 4
            };
            nodes.push(detailNode);
            links.push({ id: this.generateId(), source: pointNode.id, target: detailNode.id });
          } else {
            // Handle case where detail is an object with subpoints
            const subpointNode: MyNode = {
              id: this.generateId(),
              label: detail.name,
              data: { subpoints: detail.details },
              fixedWidth: 300,
              dynamicHeight: this.estimateHeight(detail.name, 300),
              level: 4
            };
            nodes.push(subpointNode);
            links.push({ id: this.generateId(), source: pointNode.id, target: subpointNode.id });

            // Now add nodes for each subpoint
            detail.details.forEach((subDetail: string) => {
              const subDetailNode: MyNode = {
                id: this.generateId(),
                label: subDetail,
                data: {},
                fixedWidth: 300,
                dynamicHeight: this.estimateHeight(subDetail, 300),
                level: 5
              };
              nodes.push(subDetailNode);
              links.push({ id: this.generateId(), source: subpointNode.id, target: subDetailNode.id });
            });
          }
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
    const lineHeight = 30; // Set an approximate line height
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

  getLevelColor(level: number): string {
    switch (level) {
      case 1:
        return '#f4f4f4'; // Light grey for summary and references
      case 2:
        return '#dee2e6'; // Slightly darker grey for sections
      case 3:
        return '#ced4da'; // Even darker for points
      // Add more cases as needed for deeper levels
      default:
        return '#e9ecef'; // Default color for any other level
    }
  }
  
}
