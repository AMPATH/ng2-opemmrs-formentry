import { OnInit } from '@angular/core';
import { NodeBase } from '../../form-entry/form-factory/form-node';
import { EncounterViewerService } from '../encounter-viewer.service';
export declare class EncounterViewerComponent implements OnInit {
    private encService;
    rootNode: NodeBase;
    enc: any;
    _schema: any;
    parentComponent: EncounterViewerComponent;
    node: NodeBase;
    schema: any;
    encounter: any;
    form: any;
    constructor(encService: EncounterViewerService);
    ngOnInit(): void;
    questionsAnswered(node: any): boolean;
    questionAnswered(node: NodeBase): boolean;
    checkForColon(questionLabel: string): boolean;
    isEncounterDetails(node: NodeBase): boolean;
}
