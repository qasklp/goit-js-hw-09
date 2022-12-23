const e=document.querySelector("body"),t=document.querySelectorAll("button");t[0].addEventListener("click",(function(){timerId=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t[0].disabled=!0})),t[1].addEventListener("click",(function(){clearInterval(timerId),t[0].disabled=!1}));
//# sourceMappingURL=01-color-switcher.059d5e5e.js.map
