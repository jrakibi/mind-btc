import { Edge, GraphComponent, Node } from '@swimlane/ngx-graph';
import { Workspace } from '../enums/workspace.enum';

export interface MyNode extends Node {
    label: string;
    data: any;
    fixedWidth: number;
    dynamicHeight: number; // Add this new property
    level: number;
    // You may need to add these properties based on the layout calculation ngx-graph performs
}

export interface MindMap {
    title: string;
    imageUrl: string;
    tag: string;
}
export interface LayoutMindMap {
    title: string;
    imageUrl: string;
    tag: Workspace;
}

export interface MyLink extends Edge {
    label?: string;
}