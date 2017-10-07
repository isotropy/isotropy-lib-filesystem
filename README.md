# isotropy-lib-filesystem
Filesystem Library for the Isotropy Project


```javascript
import * from "isotropy-lib-filesystem"
```


```
1. getFiles(dir, recurse = false)
  returns a promise which returns
  an array
  [
    { dir: "/abc", filename: "hllo.txt", contents: "words a..." },
    { dir, filename, contents },
    ...
  ]
```
```
2. readFile(dir, filename)
  returns a promise which returns
  an object
  { contents: fileData }
```
```
3. createFile(dir, filename, contents)
  returns a promise that can be awaited upon
```
```
4. deleteFile(dir, filename)
  returns a promise that can be awaited upon
```
```
5. updateFile(dir, filename, contents)
  returns a promise that can be awaited upon
```
```
6. moveFile(dir, filename, newDir, newFilename)
  returns a promise that can be awaited upon
```
```
7. moveDir(dir, newDir)
  returns a promise that can be awaited upon
```
