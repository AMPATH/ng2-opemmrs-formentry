import { AbstractControl } from '@angular/forms';
import { FormFactory } from './form.factory';
import { Form } from './form';
import { QuestionBase, RepeatingQuestion } from '../question-models/models';
export declare class NodeBase {
    private _control;
    private _questionModel;
    private _form;
    private _path;
    initialValue: any;
    constructor(question: QuestionBase, control?: AbstractControl, form?: Form, parentPath?: string);
    readonly question: QuestionBase;
    readonly control: AbstractControl;
    readonly form: Form;
    readonly path: string;
}
export declare class LeafNode extends NodeBase {
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form, parentPath?: string);
}
export declare class GroupNode extends NodeBase {
    private _children;
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, form?: Form, parentPath?: string);
    readonly children: any;
    setChild(key: string, node: NodeBase): void;
}
export declare class ArrayNode extends NodeBase implements ChildNodeCreatedListener {
    private formFactory;
    private childNodeCreatedEvents;
    private _children;
    createChildFunc: CreateArrayChildNodeFunction;
    removeChildFunc: RemoveArrayChildNodeFunction;
    constructor(question: QuestionBase, control?: AbstractControl, parentControl?: AbstractControl, formFactory?: FormFactory, form?: Form, parentPath?: string);
    readonly children: GroupNode[];
    createChildNode(): GroupNode;
    removeAt(index: number): void;
    addChildNodeCreatedListener(func: any): void;
    fireChildNodeCreatedListener(node: GroupNode): void;
}
export interface ChildNodeCreatedListener {
    addChildNodeCreatedListener(func: any): any;
    fireChildNodeCreatedListener(node: GroupNode): any;
}
export interface CreateArrayChildNodeFunction {
    (question: RepeatingQuestion, node: ArrayNode, factory?: FormFactory): GroupNode;
}
export interface RemoveArrayChildNodeFunction {
    (index: number, node: ArrayNode): any;
}
