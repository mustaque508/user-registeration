/************************************************** Videos *******************************************/

import {React,playlist_data,useState} from '../Header'
import ReactPlayer from 'react-player'
import PlayerControls from '../youtubeVideos/PlayerControls'
import {useRef} from 'react'
import screenfull from 'screenfull'


//format duration and currentTime
const format =(seconds)=>{
    if(isNaN(seconds)){
        return "00:00";
    }

    const date=new Date(seconds*1000);
    const hh=date.getUTCHours();
    const mm=date.getUTCMinutes();
    const ss=date.getUTCSeconds().toString().padStart(2,"0");
    if(hh){
        return `${hh}:${mm.toString().padStart(2,"0")}:${ss}`
    }

    return `${mm}:${ss}`;
}

let count=0;
 const Videos = () => {

      //player options initial states
      const [player,setPlayer]=useState({
        playing:false,
        muted:false,
        played:0,
        seeking:false
    });


    const playerRef=useRef(null);
    const playerContainerRef=useRef(null);
    const controlsRef=useRef(null);
    
    const{playing,muted,played,seeking}=player;

    const currentTime= playerRef.current ? playerRef.current.getCurrentTime(): "00:00";
    const duration=playerRef.current ? playerRef.current.getDuration(): "00:00";

    const elapsedTime=format(currentTime);
    const totalDuration=format(duration);


    //change URL based on user click
    const changeIframe = (event) =>{
        const newSRC=event.target.getAttribute("data-url");
        document.getElementById("ytplayer").firstChild.firstChild.src=newSRC;
    }

  
  

    //play and pause Video
    const onPlayPause = ()=>{
        setPlayer({
            ...player,
            playing : !player.playing
        });
    }

    //rewind 10 sec
    const onRewind = () =>{
        playerRef.current.seekTo(playerRef.current.getCurrentTime()-10); 
    }

    //Forward 10 sec
    const onForward = () =>{
        playerRef.current.seekTo(playerRef.current.getCurrentTime()+10); 
    }

    //on mute
    const onMute = () =>{
        setPlayer({
            ...player,muted :!player.muted
        })
    }

    //full screen
    const onToggleFullScreen = () =>{
        screenfull.toggle(playerContainerRef.current);
    }
    
    //progress bar
    const onProgress = (changestate) =>{

        if(count>3){
            controlsRef.current.style.visibility="hidden";
            count=0;
        }

        if(controlsRef.current.style.visibility ==="visible"){
            ++count;
        }

        if(!seeking){
            setPlayer({...player,...changestate}); 
        }
    

    }

    //progress bar function
    const onSeekChange =(e,newValue) =>{
        setPlayer({...player, played:parseFloat(newValue/100)}); 
    }

    //progress bar function
    const onSeekMouseDown =(e) =>{
        setPlayer({...player,seeking:true});
    } 

    //progress bar function
    const onSeekMouseUp =(e,newValue) =>{
        setPlayer({...player,seeking:false});
        playerRef.current.seekTo(newValue/100);
    } 

    //hide controls when video playing
    const onMouseMove=()=>{
        controlsRef.current.style.visibility="visible";
        count=0;
    }

    //play next video
    const playNextvideo = () =>{
        console.log(playerRef.current.props.url);
    }
    return (
        <div className="container youtube-section">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card video-card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title  font-weight-bolder">Video player</h3>
                                
                                <div className="row">

                                    {/* video player */}
                                    <div className="col-md-8" ref={playerContainerRef} onMouseMove={onMouseMove} >
                                        <ReactPlayer 
                                            muted={muted}
                                            ref={playerRef} 
                                            playing={playing} 
                                            id="ytplayer" 
                                            url="https://www.youtube-nocookie.com/embed/Yhs_3eoIHjk?enablejsapi=1&vq=hd1080&modestbranding=1&fs=0&rel=0&controls=0&listType=playlist&list=PL7Zm4iklj7qw18z6h8VRtVSuFZ1QtwLcN"
                                            onProgress={onProgress}

                                        />
                                        <PlayerControls 
                                            ref={controlsRef}
                                            onMute={onMute}
                                            muted={muted} 
                                            onPlayPause={onPlayPause} 
                                            playing={playing}
                                            onRewind={onRewind} 
                                            onForward={onForward}
                                            onToggleFullScreen={onToggleFullScreen}
                                            played={played}
                                            onSeek={onSeekChange}
                                            onSeekMouseUp={onSeekMouseUp}
                                            onSeekMouseDown={onSeekMouseDown}
                                            elapsedTime={elapsedTime}
                                            totalDuration={totalDuration}
                                            playNextvideo={playNextvideo}
                                        />
                                    </div>

                                 
                                     <div className="col-md">
                                        <div className="card shadow-sm p-3 mb-5 bg-white rounded play-list">
                                            {
                                                playlist_data.map((data,index)=>{
                                                    return(
                                                        <div className="media" key={index}>
                                                            <img src={data.src} width="35%" height="35%"  data-url={data.url}  title="play video" id="next-play"  alt={data.alt} className="mr-2 img-thumbnail" onClick={changeIframe} style={{'cursor':'pointer'}}/>
                                                            <div className="media-body">
                                                                <span className="mt-0">{data.title}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                          
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videos;