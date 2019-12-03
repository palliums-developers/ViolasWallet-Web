"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
class BufferUtil {
    static fromHex(source) {
        if(source){
        const data = source.match(/.{1,2}/g).map(x => parseInt(x, 16));
        return new Uint8Array(data);
        }
    }
    static fromBase64(source) {
        return Uint8Array.from(buffer_1.Buffer.from(source, 'base64'));
    }
    static fromString(source) {
        const buffer = new ArrayBuffer(source.length);
        const view = new DataView(buffer);
        for (let i = 0; i < source.length; i++) {
            view.setUint8(i, source.charCodeAt(i));
        }
        return new Uint8Array(buffer);
    }
    static toString(source) {
        const data = [];
        source.forEach(x => {
            data.push(String.fromCharCode(x));
        });
        return data.join('');
    }
    static toHex(sources) {
        const data = [];
        sources.forEach(x => {
            data.push(x.toString(16).padStart(2, '0'));
        });
        return data.join('');
    }
    static toBase64(sources) {
        return buffer_1.Buffer.from(sources).toString('base64');
    }
    static concat(a, b) {
        let a_length=0,b_length=0;
        let aa=new Uint8Array;
        let bb=new Uint8Array;
        if(a){
            a_length=a.length;
            aa=a;
        }
        if(b){
            b_length=b.length;
            bb=b;
        }
        // a?{a_length=a.length,aa=a}:{};
        // b?{b_length=b.length,bb=b}:{};
        // console.log(aa.length,bb.length)
        // console.log(a,b)

        const c = new Uint8Array(a_length + b_length);
        c.set(aa);
        c.set(bb, a_length);
        return c;

        // console.log(a==aa,b==bb)
        // const c1 = new Uint8Array(a.length + b.length);
        // c1.set(a);
        // c1.set(b, a.length);
        // return c;
    }
}
exports.BufferUtil = BufferUtil;
