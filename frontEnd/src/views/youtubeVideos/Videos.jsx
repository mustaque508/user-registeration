/************************************************** Videos *******************************************/

import {React,playlist_data, useState} from '../Header'
import ReactPlayer from 'react-player'
import PlayerControls from '../youtubeVideos/PlayerControls'


 const Videos = () => {

    //change URL based on user click
    const changeIframe = (event) =>{
      let newSRC =event.target.getAttribute('data-url');
        document.getElementById("ytplayer").url=newSRC;
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
                                    <div className="col-md-8">
                                        <ReactPlayer id="ytplayer" playing={true} url={process.env.REACT_APP_YOUTUBE_URL}/>
                                        <PlayerControls/>
                                    </div>

                                 
                                     <div className="col-md">
                                        <div className="card shadow-sm p-3 mb-5 bg-white rounded play-list">
                                            {
                                                playlist_data.map((data,index)=>{
                                                    return(
                                                        <div className="media" key={index}>
                                                            <img src={data.src} width="35%" height="35%" data-url={data.url}  title="play video" id="next-play"  alt={data.alt} className="mr-2 img-thumbnail" onClick={changeIframe} style={{'cursor':'pointer'}}/>
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