import React from 'react'
import axios from 'axios';
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mensaje: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:1323/')
        .then((response) => {
            this.setState({
                mensaje: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        return(
            <div>
                {this.state.mensaje}
            </div>
        )
    }
}

export default Navbar