const
    glob = require('glob'),
    exec = require('child_process').exec;

glob('chapters/*.md', (error, files) => {
    files.sort((a, b) => a - b);

    if (error) {
        console.log('error glob-ing files:', error);
        throw error;
    } else {
        exec([
            'pandoc',
            '-t epub',
            '--css=scripts/assets/epub.css',
            '-o output/ebook.epub',
            '-f markdown+smart',
            '--toc',
            ...files,
            'chapters/metadata.yaml'
        ].join(' '), (error) => {
            if (error) {
                console.log('pandoc error: ', error);
                throw error;
            }
        });
    }
});
