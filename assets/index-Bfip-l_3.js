(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const o of e.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();let h,y,p,a,s;window.addEventListener("load",w);function w(){h=document.getElementById("video"),a=h.videoWidth,s=h.videoHeight,y=document.getElementById("canvas"),y.width=a,y.height=s,p=y.getContext("2d"),_()}function _(){requestAnimationFrame(_),p.drawImage(h,0,0,a,s);let n=p.getImageData(0,0,a,s);n=I(n),p.putImageData(n,0,0)}function I(n){let r=new ImageData(a,s),i=L(n),l=[-1,0,1,-2,0,2,-1,0,1],t=[1,2,1,0,0,0,-1,-2,-1];for(let e=1;e<s-1;e++)for(let o=4;o<a*4-1;o+=4){let d=o+e*a*4,u=0,c=0;for(let g=-4;g<=4;g+=4)for(let m=-1;m<=1;m++){let v=g+m*a*4,b=4+m*3+g/4;u=u+l[b]*i.data[d+v],c=c+t[b]*i.data[d+v]}let f=Math.abs(u)+Math.abs(c);f>255&&(f=255),r.data[d]=f,r.data[d+1]=f,r.data[d+2]=f,r.data[d+3]=255}return r}function L(n){let r=new ImageData(a,s),i=n.data;for(let l=0;l<s;l++)for(let t=0;t<a*4;t+=4){let e=t+l*a*4,o=i[e],d=i[e+1],u=i[e+2],c=.299*o+.587*d+.114*u;r.data[e]=c,r.data[e+1]=c,r.data[e+2]=c,r.data[e+3]=255}return r}
