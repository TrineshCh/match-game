import {Component} from 'react'

import TabItem from '../TabItem'

import GameItems from '../GameItems'

import './index.css'

class GameInfo extends Component {
  state = {
    score: 0,
    timer: 60,
    activeTabId: this.props.tabsList[0].tabId,
    imageToMatch: this.props.imagesList[0].imageUrl,
    isGameOver: false,
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timer <= 0) {
          clearInterval(this.timerId)
          return {isGameOver: true}
        }
        return {timer: prevState.timer - 1}
      })
    }, 1000)
  }

  resetGame = () => {
    clearInterval(this.timerId)
    this.setState(
      {
        score: 0,
        timer: 60,
        activeTabId: this.props.tabsList[0].tabId,
        imageToMatch: this.props.imagesList[0].imageUrl,
        isGameOver: false,
      },
      this.startTimer,
    )
  }

  clickTabItem = tabId => {
    this.setState({activeTabId: tabId})
  }

  clickThumbnail = imageUrl => {
    const {imageToMatch, score} = this.state
    if (imageUrl === imageToMatch) {
      const randomImage =
        this.props.imagesList[
          Math.floor(Math.random() * this.props.imagesList.length)
        ].imageUrl
      this.setState({score: score + 1, imageToMatch: randomImage})
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  renderGameView = () => {
    const tabsList = this.props.tabsList
    const imagesList = this.props.imagesList
    const {activeTabId, imageToMatch} = this.state
    const filteredImages = imagesList.filter(
      image =>
        image.category ===
        tabsList.find(tab => tab.tabId === activeTabId).displayText,
    )
    return (
      <>
        <div className="main-img-cont">
          <img src={imageToMatch} alt="match" className="full-img" />
        </div>
        <ul className="tabs-container">
          {tabsList.map(tabDetails => (
            <TabItem
              key={tabDetails.tabId}
              tabDetails={tabDetails}
              clickTabItem={this.clickTabItem}
              isActive={activeTabId === tabDetails.tabId}
            />
          ))}
        </ul>
        <ul className="thumbnail-list-container">
          {filteredImages.map(eachItem => (
            <GameItems
              key={eachItem.id}
              gameDetails={eachItem}
              clickThumbnail={this.clickThumbnail}
            />
          ))}
        </ul>
      </>
    )
  }

  renderScorecardView = () => {
    const {score} = this.state
    return (
      <div className="scorecard">
        <img src="https://assets.ccbp.in/frontend/react-js/match-game-score-card-lg-bg.png" />
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-image"
        />
        <h1 className="t-head">Your Score</h1>
        <p className="t-para">{score}</p>
        <button
          type="button"
          className="play-again-btn"
          onClick={this.resetGame}
        >
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
              className="reset-img"
            />
            <h1 className="play-again-text">PLAY AGAIN</h1>
          </div>
        </button>
      </div>
    )
  }

  render() {
    const {score, timer, isGameOver} = this.state

    return (
      <div className="background">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="main-logo"
          />
          <div className="nav-cont-1">
            <p className="nav-para-1">
              Score: <span className="nav-span-1">{score}</span>
            </p>
            <div className="sub-nav-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
              <p className="time-para">{timer} sec</p>
            </div>
          </div>
        </nav>
        <div className="main-cont">
          {isGameOver ? this.renderScorecardView() : this.renderGameView()}
        </div>
      </div>
    )
  }
}

export default GameInfo
