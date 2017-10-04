import React from 'react';
import Grid from './grid';
import Buttons from './buttons';


class App extends React.Component {
    
    constructor () {
        super();
        this.rows = 30;
        this.cols = 50;
        this.speed = 100;
        this.state = {
            generation: 0,
            grids : Array(this.rows).fill(Array(this.cols).fill(false))
        }
    }
    
    selectBox = (row, col) =>{
        let gridCopy = arrClone (this.state.grids);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
           grids: gridCopy 
        });
    }
    
    seed = () => {
        let gridCopy = arrClone(this.state.grids);
        gridCopy.map((gridRow, row) => {
            gridRow.map((gridCol, col) => {
                if (Math.floor(Math.random()*4) === 1)
                    gridCopy[row][col] = true;
            });
        });
        
        this.setState ({
            grids: gridCopy
        });
    }
    
    play = () => {
        
        let grids = this.state.grids;
        let gridCopy = arrClone(this.state.grids);
        let generation = this.state.generation;
        let alive;
        grids.map((gridRow, row) =>{
            gridRow.map((gridCol, col) => {
                let count = 0;
                if (row > 0) if (grids[row-1][col]) count++;
                if (row > 0 && col > 0) if (grids[row-1][col-1]) count++;
                if (row > 0 && col < this.cols-1) if(grids[row-1][col+1]) count++;
                if (col > 0) if(grids[row][col-1]) count++;
                if (col < this.cols-1) if(grids[row][col+1]) count ++;
                if (row < this.rows-1) if(grids[row+1][col]) count ++;
                if (row < this.rows-1 && col < this.cols-1) if(grids[row+1][col+1]) count++;
                if (row < this.rows-1 && col > 0) if(grids[row+1][col-1]) count++;
                if (grids[row][col] && (count < 2 || count > 3)) gridCopy[row][col] = false;
                if (!grids[row][col] && count === 3) gridCopy[row][col] = true;
                if (grids[row][col]) alive = true;
            })
        });
        
         if (alive) generation++;
       
        
        
        this.setState ({
            generation: generation,
            grids: gridCopy
        });
    }
    
    playButton = () =>{
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed)
    }
    
    pauseButton = () => {
        clearInterval(this.intervalId);
    }
    
    clearButton = () => {
        this.pauseButton();
        let grids = Array(this.rows).fill(Array(this.cols).fill(false));
        this.setState ({
           generation: 0,
           grids: grids
        });
    }
    
    fast = () => {
        this.speed = 100;
        this.playButton();
    }
    
    slow = () => {
        this.speed = 1000;
        this.playButton();
    }
    
    gridSize = (size) => {
        switch (size){
            case '1':
                this.cols = 20;
                this.rows = 10;
            break;
            case '2' :
                this.cols = 50;
                this.rows = 30;
            break;
            
            default: 
                this.cols = 70;
                this.rows = 50;
        }
        
        this.clearButton();
    }
    
    componentDidMount(){
        this.seed();
        this.playButton();
    }
    
    render() {

        
        return (
            <div className='app'>
                <h1>Game of Life</h1>
                <Buttons 
                playButton = {this.playButton}
                pauseButton = {this.pauseButton}
                clearButton = {this.clearButton}
                seed = {this.seed}
                slow = {this.slow}
                fast = {this.fast}
                gridSize = {this.gridSize}
                />
                <Grid 
                rows = {this.rows}
                cols = {this.cols}
                grids = {this.state.grids}
                selectBox = {this.selectBox}
                />
                <h1>Generation: {this.state.generation}</h1>
                
            </div>
            
            );
    }
}

function arrClone (arr) {
    return JSON.parse(JSON.stringify(arr));
}    

export default App;