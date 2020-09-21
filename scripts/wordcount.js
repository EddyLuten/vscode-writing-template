const
    glob = require('glob'),
    fs   = require('fs'),
    path = require('path');

new Promise((resolve, reject) => {
    glob('chapters/*.md', (error, files) => {
        if (error) {
            console.error('glob error', error);
            reject(error);
        } else {
            resolve(
                files.map(f => ({
                    file:     path.basename(f),
                    contents: fs.readFileSync(f, 'utf-8')
                }))
                .sort((a, b) => a.file - b.file)
            );
        }
    });
})
.then((contents) => {
    const counts = contents.map(o => {
        const count = String(o.contents).trim().split(/\s+/).length;
        console.log(`${o.file}: ${count}`);
        return count;
    });
    console.log(`Total: ${counts.reduce((p, c) => p + c, 0)}`);
});
