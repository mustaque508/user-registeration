/************************************************** Videos *******************************************/

import {React,playlist_data,useState,useRef,screenfull,ReactPlayer,PlayerControls,getYouTubeID} from '../Header'

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
        seeking:false,
        url:process.env.REACT_APP_YOUTUBE_URL
    });


    const playerRef=useRef(null);
    const playerContainerRef=useRef(null);
    const controlsRef=useRef(null);
    
    const{playing,muted,played,seeking,url}=player;

    const currentTime= playerRef.current ? playerRef.current.getCurrentTime(): "00:00";
    const duration=playerRef.current ? playerRef.current.getDuration(): "00:00";

    const elapsedTime=format(currentTime);
    const totalDuration=format(duration);


    //change URL based on user click
    const changeIframe = (event) =>{
        const newSRC=event.target.getAttribute("data-url");
        setPlayer({
            url:newSRC
        });

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
    const playNextVideo = () =>{
        
      for (let index =0; index < playlist_data.length; index++) {

            //get url from playlist
            const next_url = playlist_data[index].url;

            if(getYouTubeID(url) === getYouTubeID(next_url))
            {
                setPlayer({
                    url : playlist_data[++index].url
                });
                break;
            }
            else if(getYouTubeID(url) === getYouTubeID(playlist_data[playlist_data.length-1].url)){
                setPlayer({
                    url : playlist_data[index].url
                });
                break;
            }
          
      }
    }

    //play previous video
    const playPreviousVideo = () =>{

        for (let index =0; index < playlist_data.length; index++) {

            //get url from playlist
            const prev_url = playlist_data[index].url;

            console.log(url);

            
            if(getYouTubeID(url) === getYouTubeID(prev_url)){

                if(index === 0){
                    setPlayer({
                        url : playlist_data[index].url
                    });
                    break;
                }
                else
                {
                    setPlayer({
                        url : playlist_data[--index].url
                    });
                    break;
                }
               
            } 
        }
      
    }
   

    return (
        <div className="container-fluid youtube-section">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card shadow p-3 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title font-weight-bolder text-primary mb-4 ">Video player</h3>
                                
                                <div className="row">

                                    {/* video player */}
                                    <div className="col-xl-8 p-0  youtube-palyer card shadow-lg  bg-white border-0" ref={playerContainerRef} onMouseMove={onMouseMove}>
                                        <ReactPlayer 
                                            muted={muted}
                                            ref={playerRef} 
                                            playing={playing} 
                                            id="ytplayer" 
                                            url={url}
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
                                            playNextVideo={playNextVideo}
                                            playPreviousVideo={playPreviousVideo}
                                            
                                
                                        />
                                    </div>

                                 
                                     <div className="col-xl-4 play-list">
                                        <div className="card shadow-lg  bg-white  border-0">
                                            <div className="card-body">
                                                {
                                                    playlist_data.map((data,index)=>{
                                                        return(
                                                            <div className="media" key={index}>
                                                                <img src={data.src}   data-url={data.url}  title="play video" id="next-play"  alt={data.alt} className="mr-2 img-thumbnail" onClick={changeIframe} style={{'cursor':'pointer'}}/>
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
        </div>
    )
}

export default Videos;