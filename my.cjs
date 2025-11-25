// import whyIsNodeRunning from "why-is-node-running"
// import './setupGlobals.js'
// import request from "./wxpkg/_331849227_270/request/request.js";

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

require("./setupGlobals.js");
const request = require("./wxpkg/_331849227_270/request/request.js");

console.log("aaaa");
console.log(request.signature(
    {"distCode": 0, "deptCode": 39},
    {},
    "4b30a59e-697f-40fd-a2a8-e964a7684fdd",
    "1753106095355"));
console.log(request.request_otp());
console.log(request.rid());
// console.log(request.decrypt_response())
console.log("bbbb");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// (async () => {
//     console.log('async start');
//     await sleep(1000);
//     const whyIsNodeRunning = await import('why-is-node-running');
//     console.log('whyIsNodeRunning', whyIsNodeRunning);
//     // whyIsNodeRunning.default();
//     console.log('async end');
// })()

// import('why-is-node-running').then((module) => {
//     console.log('whyIsNodeRunning', module);
//     module.default();
// }).catch((error) => {
//     console.error('Error loading why-is-node-running:', error);
// }).finally(() => {
//     console.log('finally');
// })

// whyIsNodeRunning();
