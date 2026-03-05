import {Component} from 'react'

import TabItem from '../TabItem'

import GameItems from '../GameItems'

import './index.css'

class GameInfo extends Component {
  state = {
    score: 0,
    timer: 60,
// 💡 [RYFT REVIEW - SUGGESTION] This line assumes that the first tab in the props will always be active. Consider using a more robust way to determine the active tab.
    activeTabId: this.props.tabsList[0].tabId,
// 💡 [RYFT REVIEW - SUGGESTION] This line assumes that the first image in the props will always be the one to match. Consider using a more robust way to determine the image to match.
    imageToMatch: this.props.imagesList[0].imageUrl,
    isGameOver: false,
  }

// ⚠️ [RYFT REVIEW - WARNING] This line does not check if the timer has already been started. Consider adding a check to avoid starting the timer multiple times.
  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
// ⚠️ [RYFT REVIEW - WARNING] This line does not check if the timerId is null or undefined before clearing it. Consider adding a check to avoid potential errors.
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
// 💡 [RYFT REVIEW - SUGGESTION] This line uses the prevState object directly. Consider using the spread operator to create a new object to avoid potential issues.
      this.setState(prevState => {
        if (prevState.timer <= 0) {
          clearInterval(this.timerId)
// 💡 [RYFT REVIEW - SUGGESTION] This line sets isGameOver to true when the timer reaches 0. Consider adding a check to see if the game is actually over before setting this state.
          return {isGameOver: true}
        }
// 💡 [RYFT REVIEW - SUGGESTION] This line returns a new object with isGameOver set to true. Consider using the spread operator to create a new object to avoid potential issues.
        return {timer: prevState.timer - 1}
      })
    }, 1000)
// 💡 [RYFT REVIEW - SUGGESTION] This line starts the timer every second. Consider using a more robust way to handle the timer, such as using a library or a more efficient algorithm.
  }

  resetGame = () => {
    clearInterval(this.timerId)
// 💡 [RYFT REVIEW - SUGGESTION] This line resets the game state to its initial values. Consider using a more robust way to handle game state, such as using a library or a more efficient algorithm.
    this.setState(
      {
        score: 0,
// 💡 [RYFT REVIEW - SUGGESTION] This line sets the timer to 60 seconds. Consider using a more robust way to handle the timer, such as using a library or a more efficient algorithm.
        timer: 60,
        activeTabId: this.props.tabsList[0].tabId,
        imageToMatch: this.props.imagesList[0].imageUrl,
        isGameOver: false,
      },
      this.startTimer,
    )
  }

  clickTabItem = tabId => {
// 💡 [RYFT REVIEW - SUGGESTION] This line updates the active tab ID. Consider using a more robust way to handle tab IDs, such as using a library or a more efficient algorithm.
    this.setState({activeTabId: tabId})
  }

  clickThumbnail = imageUrl => {
// 💡 [RYFT REVIEW - SUGGESTION] This line checks if the clicked image matches the current image to match. Consider using a more robust way to handle image matching, such as using a library or a more efficient algorithm.
    const {imageToMatch, score} = this.state
    if (imageUrl === imageToMatch) {
      const randomImage =
// 💡 [RYFT REVIEW - SUGGESTION] This line selects a random image from the images list. Consider using a more robust way to handle image selection, such as using a library or a more efficient algorithm.
        this.props.imagesList[
          Math.floor(Math.random() * this.props.imagesList.length)
        ].imageUrl
// 💡 [RYFT REVIEW - SUGGESTION] This line updates the image to match and the score. Consider using a more robust way to handle image matching and scoring, such as using a library or a more efficient algorithm.
      this.setState({score: score + 1, imageToMatch: randomImage})
    } else {
// 💡 [RYFT REVIEW - SUGGESTION] This line ends the game when the clicked image does not match the current image to match. Consider using a more robust way to handle game ending, such as using a library or a more efficient algorithm.
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  renderGameView = () => {
// 💡 [RYFT REVIEW - SUGGESTION] This line filters the images based on the active tab ID. Consider using a more robust way to handle image filtering, such as using a library or a more efficient algorithm.
    const tabsList = this.props.tabsList
    const imagesList = this.props.imagesList
// 💡 [RYFT REVIEW - SUGGESTION] This line extracts the active tab ID and the image to match from the state. Consider using a more robust way to handle state extraction, such as using a library or a more efficient algorithm.
    const {activeTabId, imageToMatch} = this.state
    const filteredImages = imagesList.filter(
// 💡 [RYFT REVIEW - SUGGESTION] This line filters the images based on the active tab ID. Consider using a more robust way to handle image filtering, such as using a library or a more efficient algorithm.
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
// 💡 [RYFT REVIEW - SUGGESTION] This line maps over the tabs list to render the tab items. Consider using a more robust way to handle tab rendering, such as using a library or a more efficient algorithm.
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
// 💡 [RYFT REVIEW - SUGGESTION] This line maps over the filtered images to render the game items. Consider using a more robust way to handle image rendering, such as using a library or a more efficient algorithm.
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
// 💡 [RYFT REVIEW - SUGGESTION] This line extracts the score, timer, and isGameOver from the state. Consider using a more robust way to handle state extraction, such as using a library or a more efficient algorithm.

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
// 💡 [RYFT REVIEW - SUGGESTION] This line renders the game view or the scorecard view based on the isGameOver state. Consider using a more robust way to handle view rendering, such as using a library or a more efficient algorithm.
          {isGameOver ? this.renderScorecardView() : this.renderGameView()}
        </div>
      </div>
    )
  }
}

export default GameInfo
