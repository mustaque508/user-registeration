/************************************************** Videos *******************************************/

import {React,Iframe,playlist_data} from '../Header'

 const Videos = () => {


    //change URL based on user click
    const changeIframe = (event) =>{
        console.log(event.target.getAttribute('data-url'));
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="card video-card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h3 className="card-title  font-weight-bolder">Video player</h3>
                                
                                <div className="row">

                                    {/* video player */}
                                    <div className="col-md-8">

                                        <div className="embed-responsive embed-responsive-16by9">
                                            <Iframe url="https://www.youtube-nocookie.com/embed/Yhs_3eoIHjk?enablejsapi=1&vq=hd1080&modestbranding=1&fs=0&rel=0&controls=0&listType=playlist&list=PL7Zm4iklj7qw18z6h8VRtVSuFZ1QtwLcN" modestbranding="0"  controls="0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allownetworking="internal"/>
                                        </div>
                                    </div>

                                    {/* Enterprise Edition playlist */}
                                    <div className="col-sm">
                                        <div className="card shadow-sm p-3 mb-5 bg-white rounded play-list">
                                            {
                                                playlist_data.map((data,index)=>{
                                                    return(
                                                        <div className="media" key={index}>
                                                            <img src={data.src} width="40%" height="40%"  title="play video" id="next-play"  alt={data.alt} className="mr-2 img-thumbnail"  data-url={data.url} onClick={changeIframe}/>
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