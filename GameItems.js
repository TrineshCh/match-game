// 💡 [RYFT REVIEW - SUGGESTION] Unused import, consider removing or commenting it out
import './index.css'

// 💡 [RYFT REVIEW - SUGGESTION] Consider using a more descriptive function name, e.g., 'renderGameItem'
const GameItems = props => {
// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a type definition for the 'props' object
  const {gameDetails, clickThumbnail} = props
// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a type definition for the 'gameDetails' object
  const {id, thumbnailUrl, imageUrl} = gameDetails

// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a type definition for the 'onClickThumbnail' function
  const onClickThumbnail = () => {
// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a check to ensure 'imageUrl' is not null or undefined before passing it to 'clickThumbnail'
    clickThumbnail(imageUrl)
  }

  return (
// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a class name for the 'game-item-container' element to improve accessibility
    <li className="game-item-container">
      <img
        className="game-item-thumbnail"
        src={thumbnailUrl}
        alt="thumbnail"
// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a 'preventDefault' call to prevent default behavior on the 'onClickThumbnail' event
        onClick={onClickThumbnail}
      />
    </li>
  )
}

// 💡 [RYFT REVIEW - SUGGESTION] Consider adding a JSDoc comment to describe the 'GameItems' component
export default GameItems
