1. `<input readonly />`IOS 出现 键盘弹出头部的

2. 兼容多个 input 切换时 键盘不会弹

```JS
const self = this;
const ref = this.lv.current;
ref.addEventListener('focusout', () => {
    if (self.detectFocusTimeout) {
        clearTimeout(self.detectFocusTimeout);
    }

    self.detectFocusTimeout = setTimeout(() => {
    let isStillFocus;

        ref.querySelectorAll('input').forEach(i => {
            if (i === document.activeElement) {
                isStillFocus = true;
            }
        });

        if (!isStillFocus) {
            console.log('scroll to top');
            window.scrollTo(0, 0);
        }
    }, 250);
});
```

3. hoist-non-react-statics