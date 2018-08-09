import axios from 'axios'

const EXTRACT_TEXT = 'EXTRACT_TEXT'

const extractedText = text => {
  return {
    type: EXTRACT_TEXT,
    text
  }
}

export const extractTextFromFile = url => {
  return dispatch => {
    const shortUrl = url.slice(5)
    console.log('URL is', shortUrl)
    const res = axios.post('/api/countwords', shortUrl)
    dispatch(extractedText(res.data))
  }
}

const defaultState = {
  extractedText: ''
}

export default function(state = defaultState, action) {
  switch(action.type){
  case EXTRACT_TEXT:
    return {...state, extractedText: action.text}
    default:
      return state
  }
}
