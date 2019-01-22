/*!
 * Yamlinc: v0.2.0
 * Copyright(c) 2016-2019 Javanile
 * MIT Licensed
 */


/**
 * Compile yaml file.
 *
 * @param file
 * @param incFile
 * @param callback
 * @returns {*}
 */
compile: function (file, incFile, callback) {
    if (!helpers.fileExists(file)) {
        return helpers.error('Problem', "file '" + file + "' not found.", callback);
    }

    // Compile and prepare disclaimer
    helpers.info("Analize", file);
    let data = this.resolve(file);
    let disclaimer = [
        "## --------------------",
        "## DON'T EDIT THIS FILE",
        "## --------------------",
        "## Engine: " + this.getVersion(),
        "## Source: " + file,
    ];

    // Print-out compiled code into file
    helpers.done("Compile", incFile);
    let code = data ? yamljs.safeDump(data) : 'empty: true' + EOL;

    if (this.outputMode === 'FILE') {
        mkdirp(dirname(incFile));
        fs.writeFileSync(incFile, disclaimer.join(EOL) + EOL + EOL + code);
    } else {
        process.stdout.write(incFile);
        process.stdout.write(disclaimer.join(EOL) + EOL + EOL + code);
    }

    // Trigger debugger callback
    return helpers.isFunction(callback)
        && callback({ file: file, incFile: incFile });
},