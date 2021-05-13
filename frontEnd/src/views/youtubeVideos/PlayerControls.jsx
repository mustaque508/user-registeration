import {React,Tooltip,forwardRef,PropTypes,FastRewindIcon,PauseCircleFilledIcon,FastForwardIcon,
    Slider,SkipPreviousIcon,PauseIcon,PlayArrowIcon,SkipNextIcon,VolumeOffIcon,VolumeUpIcon,Typography,FullscreenIcon} from '../Header'

const PlayerControls = forwardRef(({onPlayPause,playing,onRewind,onForward,onMute,muted,onToggleFullScreen,played,onSeekMouseUp,onSeekMouseDown,onSeek,elapsedTime,totalDuration,playNextVideo,playPreviousVideo},ref)=>{


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
        <div className="controlwrapper justify-content-center" ref={ref} >
            <div className="middlecontrols">
                <div className="row d-flex justify-content-around">

                    {/* Backword button */}
                    <div className="d-flex align-items-center" onClick={onRewind}>
                        <FastRewindIcon style={{'fontSize':'40px'}} />
                    </div>

                    {/* play button */}
                    <div className="play-button d-flex align-items-center" style={{'color':'red'}} onClick={onPlayPause}>
                        {
                            playing ? <PauseCircleFilledIcon style={{'fontSize':'60px'}} /> :  <i className="fab fa-youtube fa-4x"></i>
                        }
                   
                    </div>

                    {/* forward button */}
                    <div className="d-flex align-items-center" onClick={onForward}>
                       <FastForwardIcon  style={{'fontSize':'40px'}} />
                    </div>
                </div>
            </div>

            <div className="bottomcontrols">
                <div className="row">

                    {/* slideBar */}
                    <div className="col-12">
                        <Slider
                            className="ml-1 slider" 
                            style={{'width':'99%'}}
                            min={0}
                            max={100}
                            ValueLabelComponent={(props)=><ValueLabelComponent {...props} value={elapsedTime} />}
                            value={played*100}
                            onChange={onSeek}
                            onMouseDown={onSeekMouseDown}
                            onChangeCommitted={onSeekMouseUp}
                        />
                    </div>


                    <div className="col-12">
                        <div className="row">
                            <div className=" col-5 d-flex justify-content-between">

                                {/* prev button */}
                                <div className="button d-flex align-items-center" onClick={playPreviousVideo}>
                                    <SkipPreviousIcon/>
                                </div> 

                                {/* play button */}
                                <div className="button d-flex align-items-center" onClick={onPlayPause}>
                                    {
                                         playing ?<PauseIcon/> : <PlayArrowIcon />
                                    } 
                                </div>

                                 {/* next button */}
                                <div className=" button d-flex align-items-center" onClick={playNextVideo}>
                                    <SkipNextIcon/>
                                </div>

                                {/* volume button */}
                                <div className="button d-flex align-items-center" onClick={onMute}>
                                    {
                                        muted ? <VolumeOffIcon/>: <VolumeUpIcon/>
                                    }   
                                </div>
                                
                                {/* video-duration */}
                                <div className="button d-flex align-items-center">
                                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                                </div>

                            </div>
                      

                            <div className="d-flex justify-content-end col-7">

                                {/*full screen */}
                                <div className="button d-flex align-items-center" onClick={onToggleFullScreen}>
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






