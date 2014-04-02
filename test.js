var twitter = require('ntwitter');

var twit = new twitter({
    consumer_key: 'e2oruX8EpNyU0ORwm1uNA',
    consumer_secret: 'O2sHeYfDFtug97yX8hKDwctK8QLlWm6H2KYJLiGkXE',
    access_token_key: '128166532-4aeOelD2xMRFSudjrENOTFke0IIRWVxup6w2ga1I',
    access_token_secret: '4HhSr8GEyCmtFkCthRJY9YsHxQ0qOCIt8jJAAXS4m9Xjn'
});

twit.stream('statuses/sample', function(stream) {
    console.log( typeof stream  );
    stream.pipe( process.stdout );
});
