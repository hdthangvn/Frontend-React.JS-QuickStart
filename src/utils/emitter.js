import EventEmitter from 'events';

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); // Disable the max listeners warning

export const emitter = _emitter;