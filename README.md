Reproducing the issue with   
`typia` + `source-map-support` + `plain typescript project`

My understanding of the problem:  
Typescript compiler creates source map *BEFORE* the transformer is called.  
so source map thinks js is 22 lines,  
while resulting js is 34 lines which definitely breaks ability to enrich stack traces with proper file names and line numbers... 

To try yourself run

```
npm i
npm run dev
```

After the run, look here:

```
...
    at CorrectStackTrace (..../typia-sourcemap-issue/src/go.ts:6:15)
...
    at WrongStackTrace (..../typia-sourcemap-issue/build/go.js:25:11)
...
```

Full program output:

```
CorrectStackTrace: Error: just an error
    at CorrectStackTrace (..../typia-sourcemap-issue/src/go.ts:6:15)
    at Object.<anonymous> (..../typia-sourcemap-issue/src/go.ts:20:1)
    at Module._compile (node:internal/modules/cjs/loader:1159:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Function.Module._load (node:internal/modules/cjs/loader:878:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47
-
WrongStackTrace: Error: Error on typia.assert(): invalid type on $input, expect to be number
    at new TypeGuardError (..../typia-sourcemap-issue/node_modules/typia/src/TypeGuardError.ts:9:9)
    at ..../typia-sourcemap-issue/node_modules/typia/src/functional/$guard.ts:28:19
    at ..../typia-sourcemap-issue/build/go.js:18:53
    at ..../typia-sourcemap-issue/build/go.js:23:15
    at WrongStackTrace (..../typia-sourcemap-issue/build/go.js:25:11)
    at Object.<anonymous> (..../typia-sourcemap-issue/src/go.ts:22:1)
    at Module._compile (node:internal/modules/cjs/loader:1159:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Function.Module._load (node:internal/modules/cjs/loader:878:12)
```

