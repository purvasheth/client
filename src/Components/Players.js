import React from "react"
import "../App.css"
const Players = props => {
    return (
        <div className="playerlist" >
            <h3>Room: <span style={{ fontWeight: "normal" }}> {" "}{props.room}</span> </h3>
            <h3>Players:</h3>
            {
                props.online.map(m => <p key={m[0]}>{m[1]}{" "}{props.turn === m[0] &&
                    <span style={{
                        height: "0.5rem",
                        width: "0.5rem",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        display: "inline-block"
                    }}></span>
                }</p>)
            }
        </div>
    )
}

export default Players