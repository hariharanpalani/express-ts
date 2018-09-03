import * as cls from 'cls-hooked';
import { EventEmitter } from 'events';


const nsid = 'app-context';
const contextKey = 'appcontext';

export interface AppContext {
    requestId?: string;
}


function initContext() : any {
	return cls.getNamespace(nsid) || cls.createNamespace(nsid);
	
}

function bindContext(cb: any): any {
    const ns = cls.getNamespace(nsid);
    if (ns && ns.active) {
        return ns.bind(cb);
    }
    return cb;
}

function bindEmitter(emitter: EventEmitter) {
	const ns = cls.getNamespace(nsid);
    if (ns && ns.active) {
        return ns.bindEmitter(emitter);
    }
}

function getContext() : AppContext | null {
	const ns = cls.getNamespace(nsid);
	let context: AppContext | null = null;
	if (ns && ns.active) {
		context = <AppContext>ns.get(contextKey);
	}
	return context || null;
}

function setContext(context: AppContext) {
	const ns = cls.getNamespace(nsid);
	if (ns && ns.active) {
		return ns.set(contextKey, context);
	}
}

function updateContext(context: AppContext) {
	const ns = cls.getNamespace(nsid);
	if (ns && ns.active) {
		const storedContext = ns.get(contextKey) || {};
		return ns.set(contextKey, Object.assign(storedContext, context));
	}
}

export const AppContextManager = {
    initContext,
    bindContext,
	bindEmitter,
	getContext,
	setContext,
	updateContext
};
