import React from "react"
import "../App.css"

const Display = props => {
    return (
        <React.Fragment>
            {props.Messages.length !== 0 && props.focus === true ? <div className="display">
                {
                    props.Messages.map(
                        (chat, i) => (
                            chat[0] + " : " + chat[1]
                        )
                    )
                }
            </div > : false
            }
        </React.Fragment>
    )
}

export default Display 