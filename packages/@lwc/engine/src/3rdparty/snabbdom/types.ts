/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 @license
 Copyright (c) 2015 Simon Friis Vindum.
 This code may only be used under the MIT License found at
 https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 Code distributed by Snabbdom as part of the Snabbdom project at
 https://github.com/snabbdom/snabbdom/
 */

import { VM } from '../../framework/vm';

export type VNodeStyle = Record<string, string>;
export interface On {
    [event: string]: EventListener;
}
export type Attrs = Record<string, string | number | boolean>;
export type Classes = Record<string, boolean>;
export type Props = Record<string, any>;

export type Key = string | number;

export type VNodes<HostNode = unknown> = Array<VNode<HostNode> | null>;

export interface VNode<HostNode = unknown> {
    sel: string | undefined;
    data: VNodeData;
    children: VNodes<HostNode> | undefined;
    elm: HostNode | undefined; // 
    parentElm?: Element;
    text: string | undefined;
    key: Key | undefined;

    hook: Hooks;
    owner: VM;
}

export interface VElement<HostNode = unknown> extends VNode<HostNode> {
    sel: string;
    children: VNodes<HostNode>;
    elm: HostNode | undefined;
    text: undefined;
    key: Key;
    // TODO [#1364]: support the ability to provision a cloned StyleElement
    // for native shadow as a perf optimization
    clonedElement?: HTMLStyleElement;
}

export interface VCustomElement<HostNode = unknown> extends VElement<HostNode> {
    mode: 'closed' | 'open';
    ctor: any;
    clonedElement?: undefined;
}

export interface VComment<HostNode = unknown> extends VNode<HostNode> {
    sel: string;
    children: undefined;
    elm: HostNode | undefined;
    text: string;
    key: undefined;
}

export interface VText<HostNode = unknown> extends VNode<HostNode> {
    sel: undefined;
    children: undefined;
    elm: HostNode | undefined;
    text: string;
    key: undefined;
}

export type CustomElementContext = Record<string, Record<string, any>>;

export interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    className?: any;
    style?: any;
    classMap?: Classes;
    styleMap?: VNodeStyle;
    context?: CustomElementContext;
    on?: On;
    ns?: string; // for SVGs
}

export type CreateHook = (vNode: VNode) => void;
export type InsertHook<HostNode> = (vNode: VNode<HostNode>, parentNode: HostNode, referenceNode: HostNode | null) => void;
export type MoveHook<HostNode> = (vNode: VNode<HostNode>, parentNode: HostNode, referenceNode: HostNode | null) => void;
export type UpdateHook<HostNode> = (oldVNode: VNode<HostNode>, vNode: VNode<HostNode>) => void;
export type RemoveHook<HostNode> = (vNode: VNode<HostNode>, parentNode: HostNode) => void;

export interface Hooks<HostNode> {
    create: CreateHook;
    insert: InsertHook<HostNode>;
    move: MoveHook<HostNode>;
    update: UpdateHook<HostNode>;
    remove: RemoveHook<HostNode>;
}

export interface Module {
    create?: CreateHook;
    update?: UpdateHook;
}
