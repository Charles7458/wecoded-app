import React, { useState, useEffect } from "react"
import axios from 'axios'
import '../styles/WecodedApp.css'
import wecodedIcon from '../assets/wecoded-icon.png';
import icon2 from '../assets/icon2.png';
import icon1 from '../assets/icon1.png';
import Header from "./Header";
import Footer from "./Footer";


function Post({isDark, title, postUrl, username,profilePicUrl, desc,createdAt, tag_list}){

    return (
        <div className={isDark ? 'post-dark' : 'post'}>
            <div className="post-text">
                <a href={`${postUrl}`} target="_blank" className={isDark ? 'post-h2-dark' : 'post-h2'}>{title}</a>
                <p className="post-p">{desc}</p>
            </div>
            <p className="created-at">{createdAt}</p>
            <div className="pfp-name">
            <img src={isDark ? icon2 : icon1} alt='wecoded-icon' height='20px' className="pfp-badge"/>
                <img alt='profile pic' src={profilePicUrl} className="pfp"/>
                <p className="username">{username}</p>
            </div>
            <div className="tags-div">

                <div className="tag-container">
                    {tag_list.map(tag => {
                        return <b className={isDark ? 'tag-dark' : 'tag'}>#{tag}</b>
                    })}
                </div>
            </div>
            

            
        </div>
    )
}


export default function WecodedApp(){
    const [postsData, setPostsData] = useState([])
    const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem("userTheme")) || false)
    const [filterTag, setFilterTag] = useState("wecoded");
    function changeClass(classname){
        if(isDark){
            return `${classname}-dark`
        }
        else {
            return classname
        }
    }
    
    useEffect( () => {
       axios.get('https://dev.to/api/articles?tag='+filterTag)
            .then(response => response.data)
            .then(data => {console.log(data); setPostsData(data); });
            
    },[filterTag]);

    useEffect( ()=> {
        localStorage.setItem("userTheme", `${isDark}`);
    },[isDark]);
    
    
    // {isDark ? "-dark" : ""}
    return(   

        <div className={isDark ? "AppBody-dark" : "AppBody"}>
            
            < Header isDark={isDark} setIsDark={setIsDark} />
            {/* challenge heading begins */}
                <h1 className="head">DEVS! Welcome To</h1>
                        {/* challenge heading */}
                <div className={changeClass("ch-head-div")}>
                    {/* challenge heading text div*/}
                    <div className={changeClass("ch-head-border")}>
                        <img alt="wecoded-icon" src={isDark ? icon2 : icon1} height='100px' width='100px' />
                        <div>
                            <h2 className="ch-head">WE_CODED CHALLENGE 2025</h2>
                            <p className='by-me' >By Charles</p>
                         </div>
                        
                    </div>
                </div>
            {/* challenge heading ends */}
            <div className="wecoded-heading">
                {/* <h1 >WE__CODED:</h1>
                <p className="wecoded-desc">we_coded is a celebration of individuals who are underrepresented and otherwise marginalized in 
                    software development on the basis of gender: 
                    including women, transgender, nonbinary, gender non-conforming, and two spirit people.
                </p> */}
                <h2 className="wecoded-desc">
                    Let's celebrate diversity in tech with Code!
                </h2>
                <a href="https://dev.to/new/wecoded" target="_blank"><button className="create-entry">Share Your Story</button></a>
            </div>
            
            <div className="filter">   
                Filter with tag:<br></br>
                    <select value={filterTag} onChange={e=>setFilterTag(e.target.value)} style={{marginTop:'10px',padding:'10px 0px',width:'300px'}}>
                        <option value="wecoded">#wecoded</option>
                        <option value="womenintech">#womenintech</option>
                    </select>
                <br />
                <h2 style={{marginTop:'20px'}}>Scroll to view the posts:</h2>
            </div>
            
            {/* posts div */}

            <div className={changeClass("posts-wrapper")}>
                
                    {postsData.map( post => {
                        return <Post key={post.id}
                                    isDark={isDark}
                                    title={post.title} 
                                    postUrl={post.url} 
                                    username={post.user.username} 
                                    profilePicUrl={post.user.profile_image_90} 
                                    desc={post.description} 
                                    createdAt={post.readable_publish_date}
                                    tag_list={post.tag_list}/>
                    })}
            </div>

            <Footer isDark={isDark}/>
        </div>
    )
}