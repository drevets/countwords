const textSample = `a In it's computing, stop words are words which are filtered out before or after processing of natural language data (text). Though "stop words" usually refers to the most common words in a language, languages, word, there is no single universal list of stop words used by all natural language processing tools, and indeed not all tools even use, used, using such a list. Some tools specifically avoid, avoids, avoid, removing these stop words, word, to support phrase search.. ex Hello hellos searches searching axes ax`

let stopWords = `a about above after again against all am an and any are aren't as at be because been before being below between both but by can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought our ours ourselves out over own same shan't she she'd she'll she's should shouldn't so some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through to too under until up very was wasn't we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves`

const stopWordsTable = (string) => {
  const stopWordArray = string.split(' ')
  return stopWordArray.reduce((acc, curr) => {
    acc[curr] = true
    return acc
  }, {})
}

const removeStopWords = (str, stopWords) => {
    const wordArray = str.split(' ')
    const checkStopWords = stopWordsTable(stopWords)
    return wordArray.filter(word => {
      return !checkStopWords[word]
    })
  }

const sanitizeText = (str, countStopWords, stopWords) => {
  const sanitizedText = str.replace(/[!"#$%&\\()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g,"").toLowerCase()
  const wordArray = countStopWords ? removeStopWords(sanitizedText, stopWords) : str.split(' ')
  return wordArray
}

const countInstances = (array) => {
  const wordCount = {}
  for (let i = 0; i < array.length; i++) {
    let word = array[i]
    if (wordCount[word]) wordCount[word].instances.push(word)
    else wordCount[word] = {word: word, instances: [word]}
  }
  return wordCount
}

const lookForStems = (array) => {
  const stems = {}
  for (let i = 0; i < array.length; i++) {
    let word = array[i]
    stems[word] = [word]
    }
  for (let word in stems) {
    let pluralStem = word.slice(0, -1)
    let pastStem = word.slice(0, -2)
    let gerundStem = word.slice(0, -3)
    let stemArray = [pluralStem, pastStem, gerundStem]
    for (let j = 0; j < stemArray.length; j++){
      let stem = stemArray[j]
      if (stems[stem]) {
        stems[stem].push(word)
    }
  }
  }
  return stems
}

const markStems = (wordDict, stemDict) => {
  for (let stemWord in stemDict) {
    let stemArray = stemDict[stemWord]
     if (stemArray.length > 1) {
      wordDict[stemWord].isStem = true
      for (let i = 0; i < stemArray.length; i++) {
        let stemmedWord = stemArray[i]
        if (stemWord !== stemmedWord) {
          wordDict[stemmedWord].isStemmed = true
          wordDict[stemmedWord].stem = stemWord
        }
      }
    }
  }
  return wordDict
}

const combineStemmedWords = (wordDict) => {
  for (let word in wordDict) {
    let wordData = wordDict[word]
    if (!wordData.isStem && !wordData.isStemmed) {
      wordDict[word].count = wordData.instances.length
    } else if (wordData.isStemmed) {
      wordData.count = 0
      let wordStem = wordData.stem
      let wordStemInstances = wordDict[wordStem].instances
      wordStemInstances = wordStemInstances.concat(wordData.instances)
      wordDict[wordStem].count = wordStemInstances.length
    }
  }
  return wordDict
}

const sortWords = wordDict => {
  let wordArray = []
  for (let key in wordDict) {
    if (wordDict[key].count > 0) wordArray.push(wordDict[key])
  }
  wordArray.sort((a,b) => {
    return b.count - a.count
  })
  return wordArray
}

const countWords = (str, countStopWords, stopWords) => {
  const sanitizedText = sanitizeText(str, countStopWords, stopWords)
  const wordCount = countInstances(sanitizedText)
  const stems = lookForStems(Object.keys(wordCount))
  const markedWords = markStems(wordCount, stems)
  const combinedStems = combineStemmedWords(markedWords)
  const sortedArray = sortWords(combinedStems)

  return sortedArray.slice(0, 26)
}

const sortedWords = countWords(textSample, true, stopWords)
console.log(sortedWords)

//now I have the stopwords
//and a sanitized text string that I can do matches on.
//now the question is...how do I do this stemming algorithm??
//will I have trouble with duplicate values in the stemming area?
//what about es for plural endings??
//what about words that end with e (i.e. use and using)
//fuse + fusing
//what about ties in the number of counts

