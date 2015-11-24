module.exports = {
    compile: {
        options: {
            pretty: true,
            data: {
                hash: "<%= githash.main.short %>"
            }
        },
        files: [{
            cwd: "src/jade",
            src: ["**/*.jade",  "!**/_*.jade"],
            dest : "public/",
            expand:true,
            ext:".html"

        }]
    }
};
