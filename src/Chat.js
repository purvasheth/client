import React from "react"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import io from "socket.io-client"
import { useImmer } from 'use-immer'




const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px",
        padding: theme.spacing(2, 3),
        flex: "display",

        //flexDirection: "column",
    },
    chatWindow: {

        height: "500px",
        padding: theme.spacing(1, 1),
        borderBottom: '8px solid grey'
    },
    chatBox: {
        padding: theme.spacing(1, 1),
        height: "50px",
    },
}))


let socket;



const Chat = (props) => {
    const [text, setText] = React.useState("")
    const classes = useStyles();
    const [Messages, setMessages] = React.useState([])
    const [online, setOnline] = useImmer([]);
    const [turn, setTurn] = React.useState('')
    const [id, setId] = React.useState('id')

    if (!socket) {
        socket = io('https://rocky-tor-15250.herokuapp.com/')
        socket.emit("join", props.name, props.room);

    }

    const handleSend = (name, text) => {
        // console.log(name, text);
        socket.emit('chat message', [name, text], props.room, id)
        setMessages([[name, text]])
        setText("")
    }

    React.useEffect(() => {
        socket.on('broadcast', (message) => {
            //console.log('works', message)
            setMessages([message])
        })

        socket.on('people-list', people => {
            let newState = [];

            for (let person in people) {
                newState.push([people[person].id, people[person].name]);

            }
            setOnline(draft => { draft.push(...newState) });
            setTurn(newState[0][0])
            setId(newState[newState.length - 1][0])

        });
        socket.on('turn', (iden) => {
            setTurn(iden)
        })

        socket.on('add-person', (name, id) => {
            setOnline(draft => {
                draft.push([id, name])
            })

        })

        socket.on('remove-person', (id) => {
            setOnline(draft => draft.filter(m => m[0] !== id));


        })

    }, [])

    return (
        <div className={classes.root}>
            <Paper>

                <div className={classes.chatWindow}>
                    {
                        Messages.map(
                            (chat, i) => (
                                <div key={i}><Chip label={chat[0]} />{" selected "}{chat[1]}</div>
                            )
                        )
                    }

                </div >

                <div className={classes.chatBox}>
                    <TextField

                        style={{ width: "80%" }}
                        label="Message"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button disabled={turn === id ? false : true}
                        variant="contained" onClick={() => { handleSend(props.name, text) }} color="primary">
                        Submit
                    </Button>

                </div>

            </Paper>
            {online.map(m => <p key={m[0]}>{m[1]}</p>)}

        </div>
    )
}

export default Chat 