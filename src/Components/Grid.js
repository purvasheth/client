import React, { useContext } from "react";
import GridContext from "../GridContext"
import BooleanContext from "../BooleanContext"

const Grid = () => {
    const tableStyle = {
        border: "0.20rem solid black",
        borderCollapse: "collapse"
    }
    const [game] = useContext(GridContext)
    const [bool] = useContext(BooleanContext)
    return (
        <React.Fragment>
            <table style={tableStyle}>
                <tbody>
                    {game.map((value, i) => (
                        <tr key={i}>
                            {value.map((element, j) => (
                                <td key={i + " " + j} style={tableStyle}>
                                    <input
                                        type="text"
                                        value={element}
                                        disabled
                                        style={{
                                            color: "#26466D",
                                            width: "2rem",
                                            height: "2rem",
                                            fontSize: "1.3rem",
                                            textAlign: "center",
                                            backgroundColor: "#B9D3EE",
                                            textDecorationColor: "black",
                                            border: "transparent",
                                            textDecorationLine: bool[i][j] === false && "line-through"
                                        }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
}


export default Grid;