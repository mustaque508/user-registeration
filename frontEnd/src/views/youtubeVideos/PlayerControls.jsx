import {React} from '../Header'
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import VolumeUp from '@material-ui/icons/VolumeUp';

const PlayerControls = ()=>{
    return (
        <div className="controlwrapper">
            <div className="middlecontrols">
                <div className="row">

                    {/* Backword button */}
                    <div className="backword-button">
                        <FastRewindIcon/>
                    </div>

                    {/* play button */}
                    <div className="play-button" style={{'color':'red'}}>
                    <i class="fab fa-youtube fa-4x"></i>
                    </div>

                    {/* forward button */}
                    <div className="forward-button">
                       <FastForwardIcon/>
                    </div>
                </div>
            </div>

            <div className="bottomcontrols">
                <div className="row m-0">

                    {/* slideBar */}
                    <div className="col-12">
                        <Slider/>
                    </div>


                    <div className="col-2 buttons" style={{'border':'1px solid black'}}>
                        <div className="row">

                            {/* prev button */}
                            <div className="prev-button">
                                <SkipPreviousIcon/>
                            </div>

                            {/* play button */}
                            <div className="play-button">
                                <PlayArrowIcon/>
                            </div>

                            {/* next button */}
                            <div className="next-button">
                                <SkipNextIcon/>
                            </div>

                            {/* volume button */}
                            <div className="vol-button">
                                <VolumeUp/>
                            </div>
                        </div>
                      

                    </div>
                  
                </div>
            </div>
            
        </div>
    )
}

export default PlayerControls;
