import React from 'react';
import Box from './box'

class Grid extends React.Component {
    
    
    
    render(){
        const width = this.props.cols * 14
        let boxArr = Array(this.props.rows).fill(Array(this.props.cols).fill());
        let boxClass = '';
        
        boxArr.map((gridRow, row) =>{
            gridRow.map((gridCol, col) => {
                let boxId = row + '_' + col;
                boxClass = this.props.grids[row][col] ? 'box on' : 'box off';
                boxArr.push(
                    <Box 
                    boxClass = {boxClass}
                    boxId = {boxId}
                    key = {boxId}
                    row = {row}
                    col = {col}
                    selectBox = {this.props.selectBox}
                    />
                    );
            })
        })
        
        
        return (
            
            <div className='grid' style = {{width: width}}>
               {boxArr} 
            </div>
            );
    }
}

export default Grid;