var tweetStream = require('./twitter-listener')

tweetStream.stream({
  'track': 'twitter'
}).pipe(process.stdout)
