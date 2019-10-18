import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';




class List extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
            posts: [],
            singlePost: [],
            status: null,
            myId: '',
            newPostTitle: '',
            newPostBody: '',
            newPostUserId: '',
            showAll: false,
            showPop: false,
            showSub: false,
            showPostPop: false
            }
        this.renderAllNotes = this.renderAllNotes.bind(this);
        this.renderOneNote = this.renderOneNote.bind(this);
        this.postNewNote = this.postNewNote.bind(this);
        this.getId = this.getId.bind(this);
        this._onAllClick = this._onAllClick.bind(this);
        this._onPopClick = this._onPopClick.bind(this);
        this._onSubClick = this._onSubClick.bind(this);
        this._onPostPopClick = this._onPostPopClick.bind(this);
        this._onNewPostClick = this._onNewPostClick.bind(this);
        this.setId = this.setId.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setBody = this.setBody.bind(this);
        this.setUserId = this.setUserId.bind(this);
    }


    renderAllNotes() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => this.setState({ posts: data }));

        const { posts } = this.state;
        const status = 'All notes';

        return (
            <div>
            <div className="status">{status}</div>
                <ul className="posts">
                    {posts.map(post => 
                            <li key={post.id}>
                            <a href={post.title}>{post.title}</a>
                            </li>
             )}
                </ul>
            </div >
      );
    }

    renderOneNote(i) {
        const url = 'https://jsonplaceholder.typicode.com/posts/' + i;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ singlePost: data }));

        const { singlePost } = this.state;
        const status = 'Note ID ' + i + ' published by ' + singlePost.userId;

        return (
            <div>
                <div className="status">{status}</div>
                <h1 key={singlePost.id}>{singlePost.title}</h1>
                <div className="postContent">{singlePost.body}</div>
            </div >
        );
    }

    postNewNote(i) {
        {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    // title: newPostTitle,
                    // body: newPostBody,
                    // userId: newPostUserId,
                    title: 'foo',
                    body: 'bar',
                    userId: 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
        }
    }

    setId(e) {
        this.setState({ myId: e.target.value });
    }

    setTitle(e) {
        this.setState({ newPostTitle: e.target.value });
    }

    setBody(e) {
        this.setState({ newPostBody: e.target.value });
    }

    setUserId(e) {
        this.setState({ newPostUserId: e.target.value });
    }
    

    getId() {
        
        return (
            <div>
                <div className="apop"><div className="apopbg"></div>
                    <div className="apopcontent">
                        <input type="text" placeholder="Enter post ID" onChange={this.setId} value={this.state.myId}  />
                        <button onClick={this._onSubClick}>Submit</button></div>
                </div>
            </div >
        );
    }


    getNewPost() {

        return (
            <div>
                <div className="apop postpop"><div className="apopbg"></div>
                    <div className="apopcontent">
                        <input type="text" placeholder="Enter post title" onChange={this.setTitle} value={this.state.newPostTitle} />
                        <input type="text" placeholder="Enter post author" onChange={this.setUserId} value={this.state.newPostUserId} />
                         <textarea placeholder="Enter post content" onChange={this.setBody} value={this.state.newPostBody} />
                        <button onClick={this._onSubClick}>Submit</button></div>
                </div>
            </div >
        );
    }

    _onAllClick() {
        this.setState({
            showAll: true,
            showSub: false,
        });
    }

    _onPopClick() {
        this.setState({
            showAll: false,
            showPop: true,
        });
    }

    _onSubClick() {
        this.setState({
            showPop: false,
            showSub: true,
        });
    }

    _onPostPopClick() {
        this.setState({
            showAll: false,
            showSub: false,
            showPostPop: true,
        });
    }

    _onNewPostClick() {
        this.setState({
            showPostPop: false,
            showNewPost: true,
        });
    }

    render() {

        return (
                <div>
                    <div className="blog-menu">
                    <div className="menu">
                        <ul>
                            <li className="menu-item" onClick={this._onAllClick}>Get all notes</li>
                            <li className="menu-item" onClick={this._onPopClick}>Get note by ID</li>
                            <li className="menu-item" onClick={this._onPostPopClick}>Post notes</li>
                            <li className="menu-item">Put note by ID</li>
                            <li className="menu-item">Delete note by ID</li>
                        </ul>
                        </div>
                    </div>
                <div className="blog-list">
                    {this.state.showAll ?
                        this.renderAllNotes() :
                        null
                    }
                    {this.state.showPop ?
                        this.getId() :
                        null
                    }
                    {this.state.showSub ?
                        this.renderOneNote(this.state.myId) :
                        null
                    }
                    {this.state.showPostPop ?
                        this.getNewPost() :
                        null
                    }
                    {this.state.showNewPost ?
                        this.postNewNote(this.state) :
                        null
                    }

                </div>
            </div >
    );
    }
}


// ========================================

ReactDOM.render(
    <List />,
  document.getElementById('root')
);






