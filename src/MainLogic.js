import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import io from "socket.io-client"
import { useImmer } from 'use-immer'
import "./App.css"
import Grid from "./Components/Grid"
import GridContext from "./GridContext"
import BooleanContext from "./BooleanContext"
import Bingo from "./Components/Bingo";
import Players from "./Components/Players"
import Display from "./Components/Display";

let socket;

const MainLogic = (props) => {
    const [focus, setFocus] = React.useState(true)
    const [text, setText] = React.useState("")
    const [Messages, setMessages] = React.useState([])
    const [online, setOnline] = useImmer([]);
    const [turn, setTurn] = React.useState('')
    const [id, setId] = React.useState('id')
    const [bingo, setBingo] = React.useState([true, true, true, true, true])
    const [word] = React.useState(['B', 'I', 'N', 'G', 'O'])
    const [game] = React.useContext(GridContext)
    const [bool, setBool] = React.useContext(BooleanContext)

    function Check() {
        let lines = 0
        //across rows
        for (let i = 0; i < 5; i++) {
            let flag = true
            for (let j = 0; j < 5; j++) {
                if (bool[i][j] === true) {
                    flag = false
                    break
                }
            }
            if (flag === true) {
                lines = lines + 1
            }
        }
        //across columns
        for (let i = 0; i < 5; i++) {
            let flag = true
            for (let j = 0; j < 5; j++) {
                if (bool[j][i] === true) {
                    flag = false
                    break
                }
            }
            if (flag === true) {
                lines = lines + 1
            }
        }
        let newBingo = [true, true, true, true, true]
        if (lines > 0) {
            for (let i = 0; i < lines; i++) {
                newBingo[i] = false
            }
        }
        setBingo(newBingo)
        if (lines === 5) {
            socket.emit("won", props.name, props.room);
        }

    }

    function Main(num) {
        //set the boolean matrix
        //check the game matrix

        if (num !== "" && num < 26 && num > 0) {
            let row = 0
            let col = 0
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (game[i][j] === num) {
                        row = i
                        col = j
                        break
                    }
                }
            }
            let newBool = [...bool];
            newBool[row][col] = false
            setBool(newBool)
            Check()
        }

    }

    if (!socket) {
        socket = io('https://rocky-tor-15250.herokuapp.com/')
        //socket = io(':3001');
        socket.emit("join", props.name, props.room);

    }

    const handleSend = (name, text) => {
        socket.emit('chat message', [name, text], props.room, id)
        setMessages([[name, text]])
        Main(+text)
        setText("")
    }

    React.useEffect(() => {
        socket.on('broadcast', (message) => {
            setMessages([message])
            Main(+message[1])
        })

        socket.on('won', (name) => {
            alert(name + " Won!")
            window.location.reload(false)
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
        <React.Fragment>

            <Players online={online} turn={turn} room={props.room} />

            <Display Messages={Messages} focus={focus} />

            <div className="center">
                <Bingo word={word} bingo={bingo} />
                <Grid />
                <br />
                <br />
                <TextField
                    label="Number"
                    value={text}
                    onFocus={() => setFocus(false)}
                    omBlur={() => setFocus(true)}
                    onChange={(e) => setText(e.target.value)}
                />
                <br />
                <br />
                <Button disabled={turn === id ? false : true}
                    variant="contained" onClick={() => {

                        if (text.match("^([1-9]|1[0-9]|2[0-5])$")) {
                            handleSend(props.name, text)
                            setFocus(true)
                        }
                        else {
                            alert('please enter no between 1 and 25')
                            setText("");
                        }

                    }} color="primary">
                    Select
                    </Button>
            </div>
        </React.Fragment>
    )
}

export default MainLogic