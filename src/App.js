import React, {Component} from 'react';
import _ from 'lodash';
import './App.css';
import Perlin from 'pf-perlin';
//import Noise from 'noisejs';
//import SimplexNoise from 'simplex-noise';





const MapGrid = (props) => {



    return (
        <table >
            {_.map(props.grid, (r,k) => (
                <MapRow key={"r"+k} row={r} />
            ) )}
        </table>
    )
};

const MapRow = (props) => {

    return(
        <tr>
            { _.map(props.row, (c,k) => (
                <MapCell key={"c"+k} cell={c} />
            ) )}
        </tr>
    )
};

const MapCell = (props) => {

    let color = 'black';

    if ( props.cell > 2.2){
        color = '#CCC';
    }
    else if ( props.cell > 1.5) {
        color = '#777';
    }
    else if ( props.cell > -.1) {
        color = '#0A0';
    }
    else if ( props.cell > -.3) {
        color = '#aa0';
    }
    else if ( props.cell > -.7) {
        color = '#07f';
    }
    else {
        color = '#01f'
    }


    return(
        <td>
            <div style={{
                height: "32px",
                width: "32px",
                backgroundColor: color,
                margin: "0",
                padding: "0"
            }} >{Math.round(props.cell*10)/10}</div>
        </td>
    )
};

class App extends Component {

    constructor() {
        super();


        const noiseGenerator = new Perlin({
            seed: "begin",
            dimensions: 2,
            min: -1,
            max: 2.5,
            wavelength: 1,
            octaves: 1,
            octaveScale: .5,
            persistence: .5
        });

        //let simplex = new SimplexNoise(Math.random);

        let grid = {};
        let w = 64;
        let h = 64;

        for (let y = 0; y < h; y++) {
            grid[y] = {};
            for (let x = 0; x < w; x++) {
                grid[y][x] = noiseGenerator.get([x/10,y/10]);
                // grid[y][x] = simplex.noise2D(x/100, y/100);
            }
        }

        this.state = {
            grid: grid
        }
    }

    render() {
        return (
            <div className="App">
                <MapGrid grid={this.state.grid}/>
            </div>
        );
    }
}

export default App;
