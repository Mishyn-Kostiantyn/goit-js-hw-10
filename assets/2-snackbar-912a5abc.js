import{d as s,i as n}from"./vendor-004fbb27.js";const t={submitForm:document.querySelector(".form"),delayInput:document.querySelector('input[name="delay"]'),stateFulFilled:document.querySelector('input[value="fulfilled"]')},r=s(l,1e3);t.submitForm.addEventListener("submit",a);t.delayInput.addEventListener("input",r);function l(e){e.target.value<0&&(d(),t.submitForm.reset())}function a(e){e.preventDefault();const i=t.delayInput.value;let o=t.stateFulFilled.checked?"resolve":"reject";p(o,i).then(c).catch(m),t.submitForm.reset()}function c(e){setTimeout(()=>{n.success({timeout:3e3,title:"",icon:"",message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter"})},e)}function m(e){setTimeout(()=>{n.error({timeout:3e3,title:"",icon:"",message:`❌ Rejected promise in ${e}ms`,position:"topCenter"})},e)}function d(){n.error({timeout:3e3,title:"",message:"Please enter positive value for time delay",position:"topCenter"})}function p(e,i){return new Promise((o,u)=>{e==="resolve"?o(i):u(i)})}
//# sourceMappingURL=2-snackbar-912a5abc.js.map
