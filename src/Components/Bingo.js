import React from "react"

const Bingo = props => {
    return (
        <h1>
            {props.word.map((letter, i) => (
                <span key={i} style={{
                    textDecorationLine: props.bingo[i] === false && "line-through",
                    padding: "0.5rem"
                }}>
                    {letter}
                </span>
            ))
            }
        </h1>
    )
}

export default Bingo