import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'


export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS :
      return {
        //merge state
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET:
      return {
        //copy state and replace obj
        ...state,
        [action.id]: {
          ...state[action.id],
            likes: action.hasLiked === true
              ? state[action.id].likes.map((uid) => uid !== action.authedUser)
              : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET :
      const { tweet } = action
      let replyingTo = {}
      if ( tweet.replyingTo !== null ){
        replyingTo = {
          [tweet.replyingTo] : {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }
      //console.log(state)
      return {
        ...state,
        [action.tweet.id] : action.tweet,
        ...replyingTo
      }
    default:
      return state
  }
}
