import {React,Tooltip} from '../Header'
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { Typography } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PauseIcon from '@material-ui/icons/Pause';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import PropTypes from 'prop-types';
import {forwardRef} from 'react'

const PlayerControls = forwardRef(({onPlayPause,playing,onRewind,onForward,onMute,muted,onToggleFullScreen,played,onSeekMouseUp,onSeekMouseDown,onSeek,elapsedTime,totalDuration,playNextvideo},ref)=>{


    function ValueLabelComponent(props) {
        const { children, open, value } = props;
      
        return (
          <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
          </Tooltip>
        );
      }
      
      ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        open: PropTypes.bool.isRequired,
        value:PropTypes.string.isRequired,
      };

      
    return (
        <div className="controlwrapper" ref={ref}>
            <div className="middlecontrols">
                <div className="row">

                    {/* Backword button */}
                    <div className="button" onClick={onRewind}>
                        <FastRewindIcon style={{'fontSize':'40px'}} />
                    </div>

                    {/* play button */}
                    <div className="play-button" style={{'color':'red'}} onClick={onPlayPause}>
                        {
                            playing ? <PauseCircleFilledIcon style={{'fontSize':'60px'}} /> :  <i className="fab fa-youtube fa-4x"></i>
                        }
                   
                    </div>

                    {/* forward button */}
                    <div className="button" onClick={onForward}>
                       <FastForwardIcon  style={{'fontSize':'40px'}} />
                    </div>
                </div>
            </div>

            <div className="bottomcontrols">
                <div className="row m-0">

                    {/* slideBar */}
                    <div className="col-12">
                        <Slider
                            className="ml-2" 
                            style={{'width':'98%'}}
                            min={0}
                            max={100}
                            ValueLabelComponent={(props)=><ValueLabelComponent {...props} value={elapsedTime} />}
                            value={played*100}
                            onChange={onSeek}
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onSeekMouseUp}
                        />
                    </div>


                    <div className="col-12 m-0">
                      <div className="row ">
                                <div className="col-4 buttons">

                                    {/* prev button */}
                                    <div className="button">
                                        <SkipPreviousIcon/>
                                    </div> 

                                    {/* play button */}
                                    <div className="button"onClick={onPlayPause}>
                                     {
                                         playing ?<PauseIcon/> : <PlayArrowIcon />
                                     } 
                                    </div>

                                    {/* next button */}
                                    <div className="button" onClick={playNextvideo}>
                                        <SkipNextIcon/>
                                    </div>

                                    {/* volume button */}
                                    <div className="button" onClick={onMute}>
                                        {
                                            muted ? <VolumeOffIcon/>: <VolumeUpIcon/>
                                        }
                                       
                                    </div>

                                    {/* video-duration */}
                                    <div className="button">
                                        <Typography>{elapsedTime}/{totalDuration}</Typography>
                                    </div>

                                </div>

                                <div className="col-8 d-flex justify-content-end">

                                        {/* video-duration */}
                                        <div className="button" onClick={onToggleFullScreen}>
                                            <FullscreenIcon/>
                                        </div>
                                </div>
                      </div>
                            
                    </div>
                  
                </div>
            </div>
            
        </div>
    )
});

export default PlayerControls;






