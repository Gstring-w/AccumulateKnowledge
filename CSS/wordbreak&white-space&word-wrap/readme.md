### 浏览器默认空格，换行等行为

所有的联系的空格，换行符合并为一个空格
英文字符超出不换行，中文换行

### white-space
  - 控制空白字符显示的
  - 副作用：是否自动换行
  - 值：normal(根据浏览器默认的来【空格换行符合并为一个空格】) | nowrap(永不换行) | pre(保持原样) | pre-wrap(保持原样+自动超出换行) | pre-line(合并空格，换行符可以使用+超出自动换行)

### word-break 
  - 控制单词如何拆分换行的
  - normal | keep-all(不拆分，不换行) | break-all(强行拆分，换行)

### overflow-wrap
  - normal | break-word