import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chat from "./Chat"




const Main = () => {
    const [name, setName] = React.useState("")
    const [id, setId] = React.useState("")
    const [room, setRoom] = React.useState("")
    return (
        <div>

            {
                id === "" ?
                    < div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }} >
                        <TextField

                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br />
                        <TextField

                            label="Room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button variant="contained" onClick={() => { setId(name) }} color="primary">
                            Submit
            </Button>
                    </div >
                    :
                    <Chat name={id} room={room} />

            }
        </div >
    )
}

export default Main