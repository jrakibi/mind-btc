// Import statements
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Edge, GraphComponent, Layout, Node } from '@swimlane/ngx-graph';
import { LayoutMindMap, MindMap, MyLink, MyNode } from 'src/app/interfaces/mindmap.interface';
import { AppContext } from 'src/app/services/app-context';
import { OpenaiService } from 'src/app/services/open-ai.service';
import { MindMapperResponse } from '../../model/mind-map.api.interfaces';

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
  mindMapData: MindMapperResponse | null = null;
  isLoading: boolean = true; // Initialize as true to show the loader initially

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

  }


  // Lifecycle hooks
  ngOnInit(): void {
    // Mind Map initialization logic
    debugger
    this.generateMindMapperResponse(this.appContext.topic);



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

  }

  ngAfterViewInit(): void {
    this.graphComponent?.zoomTo(this.zoomLevel);
  }

  // Methods
  submitData(): void {
    // Form submission logic
  }

  generateMindMapperResponse(topic: string) {
    debugger
    
    this.isLoading = true; // Start loading
    this.openaiService.getMindMapper(topic).subscribe({
      next: (response) => {
        this.mindMapData = response;
        this.appContext.storeMindMapperData(response); // Store the data
        this.isLoading = false; // Stop loading when data is received
        if (this.mindMapData) {
          this.jsonData = this.mindMapData; // Assign the dynamic data to the jsonData property
          const graphData = this.transformToGraphData(this.jsonData);
          this.nodes = graphData.nodes;
          this.links = graphData.links;
        } else {
          console.error('No data available for the Mind Map');
        }

      },
      error: (err) => {
        
        console.error('Error generating Mind Mapper:', err);
        this.isLoading = false; // Stop loading when data is received

      }
    });
  }

  private generateId(): string {
    return `node-${this.idCounter++}`;
  }



  private transformToGraphData(jsonData: any): { nodes: MyNode[], links: MyLink[] } {
    const nodes: MyNode[] = [];
    const links: MyLink[] = [];

    // Root Node
    const rootNode: MyNode = {
        id: this.generateId(),
        label: jsonData.topic.name,
        data: {},
        fixedWidth: 450,
        dynamicHeight: 170, // Adjust as needed
        level: 0
    };
    nodes.push(rootNode);

    // Summary Node
    const summaryNode: MyNode = {
        id: this.generateId(),
        label: 'Summary',
        data: { summary: jsonData.topic.details },
        fixedWidth: 400,
        dynamicHeight: this.estimateHeight(jsonData.topic.details, 450),
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
        data: { references: jsonData.references },
        fixedWidth: 400,
        dynamicHeight: this.estimateHeight(jsonData.references.join('\n'), 400),
        level: 1
    };
    nodes.push(referencesNode);
    links.push({ id: this.generateId(), source: rootNode.id, target: referencesNode.id });

    // Recursive function to handle subtopics
    const addSubtopics = (subtopics: any[], parent: MyNode, level: number) => {
        subtopics.forEach((subtopic) => {
            const subtopicNode: MyNode = {
                id: this.generateId(),
                label: subtopic.name,
                data: { details: subtopic.details },
                fixedWidth: 400,
                dynamicHeight: this.estimateHeight(subtopic.name, 400) + 40,
                level: level
            };
            nodes.push(subtopicNode);
            links.push({ id: this.generateId(), source: parent.id, target: subtopicNode.id });

            if (subtopic.subtopics && subtopic.subtopics.length > 0) {
                addSubtopics(subtopic.subtopics, subtopicNode, level + 1);
            }
        });
    };

    // Start adding subtopics from level 2
    addSubtopics(jsonData.topic.subtopics, sectionNode, 2);

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
