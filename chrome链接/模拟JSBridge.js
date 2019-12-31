javascript: (function SpyOn() {
  function CreateText() {
    var text =
      typeof JS_AlipayJSBridge_TEXT == "undefined"
        ? document.createElement("textarea")
        : JS_AlipayJSBridge_TEXT;
    text.style.position = "fixed";
    text.style.top = "20px";
    text.style.backgroundColor = "#444";
    text.style.zIndex = 9999;
    text.style.color = "#fff";
    text.style.width = "400px";
    text.style.height = "400px";
    text.contenteditable = true;
    text.setAttribute("id", "JS_AlipayJSBridge_TEXT");
    text.value =
      "{\nwActionSheet: {\n\tcode: '10000',\n\tdata:{\n\t\titem: '个体工商户营业执照'\n\t\t}},\nsChooseImage: {\n\tcode: '10000',\n\tdata: {\n\t\tpaths: ['https://private-images.shouqianba.com/47/1571880164788279--47d3481b77803a11f63badc70ceb6a30.jpg?Expires=1574395694&OSSAccessKeyId=LTAIf4w9oUgn1uKg&Signature=rMJIBs2PRWkFGUi06gQzMEXhdlU%3D']\n\t\t}\n\t},\nsDatePicker: {\n\tcode: '10000',\n\tdata:{\n\t\tresult: '20121101'\n\t\t}},\n}";
    document.body.append(text);
    var btn =
      typeof JS_AlipayJSBridge_BUTTON == "undefined"
        ? document.createElement("button")
        : JS_AlipayJSBridge_BUTTON;
    btn.setAttribute("id", "JS_AlipayJSBridge_BUTTON");
    btn.setAttribute(
      "style",
      `        position: fixed;        top: 10px;        color: #fff;        background-color: #abcdef;        z-index: 100000;        font-size: 12px;        border-radius: 5px;        `
    );
    btn.innerText = "确认";
    document.body.append(btn);
    btn.onclick = () => {
      document.body.removeChild(text);
      document.body.removeChild(btn);
      eval(`window.JS_AlipayJSBridge_12306 = ${text.value}`);
      injectBridge();
    };
  }
  function injectBridge() {
    window.AlipayJSBridge = {
      call: (str, params, cb) => {
        if (window.JS_AlipayJSBridge_12306[str]) {
          cb(window.JS_AlipayJSBridge_12306[str]);
        }
      }
    };
  }
  CreateText();
})();
