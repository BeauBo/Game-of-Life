import React from 'react';
import {Button, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';


class Buttons extends React.Component {
    
    handleSelect = (e) =>{
        this.props.gridSize(e);
    }
    
    render(){
        const buttonStyle = {
            background: '#686865',
            color: 'white',
            border_radius: '15px',
            font: 'bold Tahoma 16px',
            width: '90px'
        };
        return (
            <div >
                <ButtonToolbar>
                    <Button onClick = {this.props.playButton} style={buttonStyle}>Play</Button>
                    <Button onClick = {this.props.pauseButton} style={buttonStyle}>Pause</Button>
                    <Button onClick = {this.props.clearButton} style={buttonStyle}>Clear</Button>
                    <Button onClick = {this.props.seed} style={buttonStyle}>Seed</Button>
                    <Button onClick = {this.props.slow} style={buttonStyle}>Slow</Button>
                    <Button onClick = {this.props.fast} style={buttonStyle}>Fast</Button>
                    <DropdownButton 
                    title = 'Grid Size' 
                    onSelect = {this.handleSelect} 
                    id='size-menu'
                    onClick = {this.props.pauseButton}
                    style={buttonStyle} 
                    >
                        <MenuItem eventKey = '1'>20 &times; 10</MenuItem>
                        <MenuItem eventKey = '2'>50 &times; 30</MenuItem>
                        <MenuItem eventKey = '3'>70 &times; 50</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
            );
    }
}

export default Buttons;