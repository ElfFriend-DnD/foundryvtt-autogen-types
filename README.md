# Foundry Typescript Generation Experiment

@LukeAbby and I went down the rabbit hole of attempting to generate a `foundry.d.ts` file out of its [JSDoc](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html). 

This experiment resulted in our opening [an issue](https://gitlab.com/foundrynet/foundryvtt/-/issues/3729) on the Gitlab regarding some outstanding JSDoc issues.

Here's what we learned and how you can reproduce our findings.

## Generating your own `.d.ts`

1. Clone this repo
2. `npm install`
3. Copy your locally installed `foundry.js` file into the correct `/src/` directory (066 or 073 depending on the foundry.js you copy)
4. Run `npm run generate:<version>` where `<version>` is `066` or `077` depending on what you copied in step 3.

   #### Error!

   If you're generating 073, right about now you should get an error that looks like this:

   ```
   autogen-foundry-types/node_modules/typescript/lib/tsc.js:84774
                   throw e;
                   ^

   Error: Debug Failure. False expression.
       at getConstructorDefinedThisAssignmentTypes (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40571:22)
       at getWidenedTypeForAssignmentDeclaration (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40426:67)
       at getTypeOfVariableOrParameterOrPropertyWorker (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40729:24)
       at getTypeOfVariableOrParameterOrProperty (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40682:28)
       at getTypeOfSymbol (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40986:24)
       at getTypeOfInstantiatedSymbol (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40943:44)
       at getTypeOfSymbol (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:40977:24)
       at checkPropertyAccessExpressionOrQualifiedName (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:54256:112)
       at checkPropertyAccessExpression (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:54116:17)
       at checkExpressionWorker (/mnt/d/foundryStuff/types/autogen-foundry-types/node_modules/typescript/lib/tsc.js:58298:28)
   ```

   The line `getConstructorDefinedThisAssignmentTypes` is saying it's been assigned poorly; something documented with a type `T` is being assigned a type `U` that is not assignable. In the code this seems to be `any` primarily.

   To get around this we will have to modify our TS compiler, this is not something you should ever want to do.

5. Do something like `nano +<line number> ./node_modules/typescript/lib/tsc.js` (for me that's line number +40571, which can be found by looking at the end of the first "at" in the error message) to edit the tsc file. The line should probably be something like `ts.Debug.assert(types.length === declarations.length);`. Comment that whole line out.
6. Run `npm run generate:<version>` again, hopefully it will overwrite/generate the `foundry.d.ts` alongside your copied `foundry.js` file in `src`.

### Troubleshooting
If you encounter any other similar errors to the one above, the solution is the same: Go into `tsc.js` and comment out the offending line. **Again, this is a terrible idea and you should not want to do this ever.** These issues are because of problems that exist in the JSDoc comments, which should ideally be fixed before attempting to generate the `.d.ts` file.

## Generating your own JSDoc

Assuming you've run `npm install`, run `npm jsdoc:<version>`. This will output a bunch of HTML files into the `out` directory which can be opened in any browser.

## Patching foundry.js

@lukeabby spent some hours writing a patch file to fix some of the problems in 0.7.3's JSDoc in an effort to get this running smoother. You can find this in `src/foundry_073/changes.patch` and once you've copied your own `foundry.js` into that directory, you can apply this patch like so:

```
git apply --reject --ignore-whitespace --ignore-space-change src/foundry_073/changes.patch
```

- `--reject` will make git attempt to apply the patch piecemeal and create a `foundry.js.rej` file at the end of the process containing any patch items it could not apply.


## Conclusions

Running the autogeneration in 066 was essentially worthless. But the changes made in the 0.7.x updates to documentation have greatly improved the viability of autogeneration for at least a baseline `.d.ts` file. We think this proof of concept is a good starting point for a low-touch official definition file for foundry's core software.

### Steps forward

1. Encourage and Assist with JSDoc edits to foundry.js itself. The more correct these comments are the more correct the generated `.d.ts` file is.
2. Audit generated types to see which need patches for extensibility (e.g. `Actor.data` should implement a generic to allow systems and modules an easy way to augment this).
3. Compare generated files with NickEast's [`foundry-pc-types`](https://gitlab.com/foundry-projects/foundry-pc/foundry-pc-types) initiative and decide how best to reconcile the two.