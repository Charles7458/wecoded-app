import React, { useState, useEffect } from "react"
import axios from 'axios'
import '../styles/WecodedApp.css'
import wecodedIcon from '../assets/wecoded-icon.png';
import icon2 from '../assets/icon2.png';
import icon1 from '../assets/icon1.png';
import Header from "./Header";


function Post({isDark, title, postUrl, username,profilePicUrl, desc, tag_list}){

    return (
        <div className={isDark ? 'post-dark' : 'post'}>
            <a href={`${postUrl}`} target="_blank" className="post-h2">{title}</a>
            <p className="post-p">{desc}</p>
            <div style={{display:'flex', verticalAlign:'center', alignItems:'center'}}>
                <img alt='profile pic' src={profilePicUrl} className="pfp"/>
                <p className="username">{username}</p>
            </div>
            <p style={{margin:'20px'}}>
                tags: 
                <div style={{width:'100px', marginLeft:'30px'}}>
                    {tag_list.map(tag => {
                        return <b className="tag">{tag}</b>
                    })}
                </div>
            </p>
            
        </div>
    )
}


export default function WecodedApp(){
    const [postsData, setPostsData] = useState([])
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("userTheme")) || false)
    
    useEffect( () => {
       axios.get('https://dev.to/api/articles?tag=wecoded')
            .then(response => response.data)
            .then(data => {console.log(data); setPostsData(data); });
            
    },[]);

    useEffect( ()=> {
        localStorage.setItem("userTheme", `${isDark}`);
    },[isDark]);
    
    
    // {isDark ? "-dark" : ""}
    return(   

        <div className={isDark ? "AppBody-dark" : "AppBody"}>
            
            < Header isDark={isDark} setIsDark={setIsDark} />
            {/* challenge heading begins */}
                <h1 className="head">Hello DEVS!</h1>
                        {/* challenge heading */}
                <div className={isDark ? "ch-head-div-dark" : "ch-head-div"}>
                    {/* challenge heading text div*/}
                    <div className={isDark ? "ch-head-border-dark" : "ch-head-border"}>
                        <img alt="wecoded-icon" src={isDark ? icon2 : icon1} height='100px' width='100px' />
                        <div>
                            <h2 className="ch-head">WE_CODED CHALLENGE 2025</h2>
                            <p className='by-me' >By Charles7458</p>
                        </div>
                        
                    </div>
                </div>
            {/* challenge heading ends */}

            {/* posts div */}
            <div className={isDark ? "posts-wrapper-dark" : "posts-wrapper"}>
                <img className="post-symbol" alt="wecoded-icon"></img>
                    {postsData.map( post => {
                        return <Post key={post.id}
                                    isDark={isDark}
                                    title={post.title} 
                                    postUrl={post.url} 
                                    username={post.user.username} 
                                    profilePicUrl={post.user.profile_image_90} 
                                    desc={post.description} 
                                    tag_list={post.tag_list}/>
                    })}
            </div>
        </div>
    )
    

    
        
        
    
}