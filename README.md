# isotropy-lib-fs
Filesystem Library for the Isotropy Project


```javascript
import * from "isotropy-lib-fs"
```


```
1. getFiles(dir, recurse = false)  
  returns an array [{ dir: "/abc", filename: "hllo.txt", contents: "words a..." }, { dir, filename, contents }, ...]
```
```
2. readFile(dir, filename);
  returns an object - { contents: fileData }
```
```
3. createFile(dir, filename, contents)
  returns nothing
```
```
4. deleteFile(dir, filename)
  returns nothing
```
```
5. updateFile(dir, filename, contents)
  returns nothing
```
```
6. moveFile(dir, filename, newDir, newFilename)
  returns nothing
```
```
7. moveDir(dir, newDir)
  returns nothing
```
