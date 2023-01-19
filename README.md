# ifram 调用 print 回调 onafterprint 没有生效
read html guide where for print it explains when before and after are ignored if there is a sandbox present. frames are usually considered a sandbox to separate domains see [https://www.w3schools.com/TAGS/att_sandbox.asp](https://www.w3schools.com/TAGS/att_sandbox.asp) [https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-print](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-print).If the printing dialog is blocked by a Document's sandbox, then neither the beforeprint nor afterprint events will be fired

## 参考 [stackoverflow.com] 的回答
[具体连接](https://stackoverflow.com/questions/75156033/the-iframe-print-event-onafterprint-event-is-not-triggered-in-the-react-and-vue) 因为框架属于sandbox, 	sandbox 阻碍得 afterprint 和beforeprint 的事件回调

## 解决方法 待定