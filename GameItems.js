import './index.css'

const GameItems = props => {
  const {gameDetails, clickThumbnail} = props
  const {id, thumbnailUrl, imageUrl} = gameDetails

  const onClickThumbnail = () => {
    clickThumbnail(imageUrl)
  }

  return (
    <li className="game-item-container">
      <img
        className="game-item-thumbnail"
        src={thumbnailUrl}
        alt="thumbnail"
        onClick={onClickThumbnail}
      />
    </li>
  )
}

export default GameItems
