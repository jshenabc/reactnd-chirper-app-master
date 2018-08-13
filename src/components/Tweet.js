import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'


class Tweet extends Component {
  toParent = (e, id)=> {
    e.preventDefault()
  }
  handleLike = (e) => {
    e.preventDefault()
  }
  render() {
    const { tweet } = this.props
    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet
    if (tweet === null) {
      return(
        <p>This tweet doesnt exist</p>
      )
    }
    console.log(this.props)
    return (
      <div className='tweet'>
        <img
          src={avatar}
          alt={`Avator of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>Replying to @{parent.author}</button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon'/>
                : <TiHeartOutline className='tweet-icon'/>
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

//use function formatTweet (tweet, author, authedUser, parentTweet)
function mapStateToProps ({authedUser, users, tweets}, {id}) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
  }
}

export default connect(mapStateToProps)(Tweet)
