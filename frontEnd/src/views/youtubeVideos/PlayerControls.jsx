import {React,forwardRef,PropTypes,FastRewindIcon,PauseCircleFilledIcon,FastForwardIcon,
    Slider,SkipPreviousIcon,PauseIcon,PlayArrowIcon,SkipNextIcon,VolumeOffIcon,VolumeUpIcon,Typography,FullscreenIcon} from '../Header'

const PlayerControls = forwardRef(({onPlayPause,playing,onRewind,onForward,onMute,muted,onToggleFullScreen,played,onSeekMouseUp,onSeekMouseDown,onSeek,elapsedTime,totalDuration,playNextVideo,playPreviousVideo},ref)=>{


    function ValueLabelComponent(props) {
        const { children, value } = props;
      
        return (
          <span title={value}>
            {children}
          </span>
        );
      }
      
      ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        value:PropTypes.string.isRequired
      };

      
    return (
        <div className="controlwrapper justify-content-center" ref={ref} >
            <div className="middlecontrols">
                <div className="row d-flex justify-content-around">

                    {/* Backword button */}
                    <div className="d-flex align-items-center" onClick={onRewind}>

                        <span title="backward 10 sec">
                            <FastRewindIcon style={{'fontSize':'40px'}} />
                        </span>
                        
                    </div>

                    {/* play button */}
                    <div className="play-button d-flex align-items-center" style={{'color':'red'}} onClick={onPlayPause}>
                        {
                            playing ?   <span title="pause"><PauseCircleFilledIcon style={{'fontSize':'60px'}} /></span>  :  <span title="play"><i className="fab fa-youtube fa-4x"></i></span>
                        }
                   
                    </div>

                    {/* forward button */}
                    <div className="d-flex align-items-center" onClick={onForward}>
                        <span title="forward 10 sec">
                            <FastForwardIcon  style={{'fontSize':'40px'}} />
                        </span>
                     
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
                                    <span title="previous video">
                                        <SkipPreviousIcon />
                                    </span>
                                </div> 

                                {/* play button */}
                                <div className="button d-flex align-items-center" onClick={onPlayPause}>
                                    {
                                         playing ?  <span title="pause"><PauseIcon/></span> :   <span title="play" ><PlayArrowIcon /></span>
                                    } 
                                </div>

                                 {/* next button */}
                                <div className=" button d-flex align-items-center" onClick={playNextVideo}>
                                    <span title="next video">
                                        <SkipNextIcon/>
                                    </span>
                                </div>

                                {/* volume button */}
                                <div className="button d-flex align-items-center" onClick={onMute}>

                                    {
                                        muted ?  <span title="volume off"><VolumeOffIcon/></span>:  <span title="volume up"><VolumeUpIcon/></span>
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
                                    <span title="full screen">
                                        <FullscreenIcon/> 
                                    </span>
                                    
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






