var twitterListener = require('./twitter-listener')

twitterListener.stream({
  'track': 'twitter'
}).pipe(process.stdout)
