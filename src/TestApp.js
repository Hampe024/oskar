import React, { useEffect, useRef, useState } from 'react';
import RecentPost from "./components/RecentPost";

export default function TestApp() {
    const [posts, setPosts] = useState([]);
    const newPostRef = useRef({current: {value: {length: 0}}});
    const newPostLengthCheckRef = useRef(null);

    function addPost(event) {
        event.preventDefault();

        const newPostValue = newPostRef.current.value;
    
        if (newPostValue.trim() !== "") {
        const newPost = {
            author: "John Doe", // replace with something like user.name
            txt: newPostValue,
            date: new Date().toISOString()
        };
      
        setPosts((prevPosts) => [...prevPosts, newPost]);

        newPostRef.current.value = "";
        }
    }

    function checkLength() {
        const postLength = newPostRef.current.value.length
        const newPostLengthCheck = newPostLengthCheckRef.current;
        console.log(postLength)
        
        if (postLength > 140) {
            newPostLengthCheck.style.color = "red";
            newPostLengthCheck.textContent = "Meddelanden får innehålla högst 140 tecken! ( " + postLength + "/140)"
        } else {
            newPostLengthCheck.style.color = "black";
            newPostLengthCheck.textContent = postLength + "/140"
        }
    }

    useEffect(() => {
        checkLength()
    }, []);

    return (
        <div>
            <form className="tweeter-box" onSubmit={addPost}>
                <input type="text" ref={newPostRef} onChange={checkLength}/>
                <input type="submit" value={"Posta"} />'
                <p className='length-msg' ref={newPostLengthCheckRef}>Meddelanden får innehålla högst 140 tecken!</p>
            </form>

            <div>
                {posts.length === 0 ? (
                    <p>Inga posts ännu...</p>
                    ) : (
                    <div>
                    {posts.map((post, index) => (
                        <div key={index}>
                        <RecentPost
                            author={post.author}
                            txt={post.txt}
                            date={post.date}
                        />
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
