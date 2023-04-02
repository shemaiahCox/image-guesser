export default function Tile({ handleTileClick }) {
    return (
        <div 
            className="tile"
            onClick={(e) => handleTileClick(e)}
        >
        </div>
    )
}