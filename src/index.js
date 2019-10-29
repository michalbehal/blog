import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'




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
            showDel: false,
            showSmashed: false,
            showPostPop: false,
            showFill: false,
            showOk: false,
            showEdit: false,
            showEditBoard: false,
            showChange: false,
            looper: true
            }
        this.renderAllNotes = this.renderAllNotes.bind(this);
        this.renderOneNote = this.renderOneNote.bind(this);
        this.postNewNote = this.postNewNote.bind(this);
        this.renderNewPreview = this.renderNewPreview.bind(this);
        this.renderChanged = this.renderChanged.bind(this);
        this.renderPostForEdit = this.renderPostForEdit.bind(this);
        this.getId = this.getId.bind(this);
        this._onAllClick = this._onAllClick.bind(this);
        this._onPopClick = this._onPopClick.bind(this);
        this._onSubClick = this._onSubClick.bind(this);
        this._onPopDelClick = this._onPopDelClick.bind(this);
        this._onDelClick = this._onDelClick.bind(this);
        this._onPostPopClick = this._onPostPopClick.bind(this);
        this._onSendPostClick = this._onSendPostClick.bind(this);
        this._onPopEditClick = this._onPopEditClick.bind(this);
        this._onEditIdClick = this._onEditIdClick.bind(this);
        this._onEditPostClick = this._onEditPostClick.bind(this);
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
                            <a href={post.id}>{post.title}</a>
                            </li>
             )}
                </ul>
                </div>
            );
    }

    renderOneNote(i) {
        const url = 'https://jsonplaceholder.typicode.com/posts/' + i;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ singlePost: data }));

        const { singlePost } = this.state;

        if (Object.keys(singlePost).length === 0) {
            const status = 'Note ID ' + i + ' not found';

            return (
                <div>
                    <div className="status">{status}</div>
                </div >
                );

        } else {
        const status = 'Note ID ' + i + ' published by ' + singlePost.userId;

        return (
            <div>
                <div className="status">{status}</div>
                <h1 key={singlePost.id}>{singlePost.title}</h1>
                <div className="postContent">{singlePost.body}</div>
            </div >
            );
        }
    }

    renderPostForEdit(i) {
        if (this.state.looper) {
            console.warn(i);
            const url = 'https://jsonplaceholder.typicode.com/posts/' + i;
            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({ singlePost: data }));

            const { singlePost } = this.state;
            console.log(singlePost);

            if (Object.keys(singlePost).length === 0) {
                const status = 'Note ID ' + i + ' not found';

                return (
                    <div>
                        <div className="status">{status}</div>
                    </div >
                );

            } else {
                    this.setState({
                        newPostTitle: singlePost.title,
                        newPostBody: singlePost.body,
                        newPostUserId: singlePost.userId
                    });
            }
            this.setState({
                looper: false
            });
        } else {

            return (
                <div>
                    <div className="apop postpop"><div className="apopbg"></div>
                        <div className="apopcontent">
                            <span>Currently editing note with ID {i}</span>
                            <div className="form">
                                <input type="text" placeholder="Enter post title" onChange={this.setTitle} value={this.state.newPostTitle} />
                                <input type="text" placeholder="Enter post author" onChange={this.setUserId} value={this.state.newPostUserId} />
                                <textarea placeholder="Enter post content" onChange={this.setBody} value={this.state.newPostBody} />

                                {this.state.showFill ?
                                    <div className="result wrong">Please fill all fields to submit a note</div> :
                                    null
                                }
                                {this.state.showOk ?
                                    <div className="result correct">Note was successfully changed</div> :
                                    null
                                }
                                <button onClick={this._onEditPostClick}>Submit</button></div>
                        </div >
                    </div>
                </div >
            );

        }
    }

    renderSmashedPost(i) {


        const url = 'https://jsonplaceholder.typicode.com/posts/' + i;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ singlePost: data }));

        const { singlePost } = this.state;
        if (Object.keys(singlePost).length === 0) {
            const status = 'Note ID ' + i + ' not found';

            return (
                <div>
                    <div className="status">{status}</div>
                </div >
            );

        } else {
            fetch(url, {
                method: 'DELETE'
            })

            const status = 'Note ID ' + i + ' has been deleted';

            return (
                <div>
                    <div className="status">{status}</div>
                </div >
            );
        }

        
    }

    renderNewPreview() {
        const status = 'Preview of your submited note';

        return (
            <div>
                <div className="status">{status}</div>
                <h1 key='p1'>{this.state.newPostTitle}</h1>
                <div className="postContent">{this.state.newPostBody}</div>
            </div >
        );
    }

    renderChanged(i) {

        fetch('https://jsonplaceholder.typicode.com/posts/' + this.state.myId, {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.myId,
                title: this.state.newPostTitle,
                body: this.state.newPostBody,
                userId: this.state.newUserId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))


        const status = 'Preview of changed note with ID ' + i + ' published by ' + this.state.newPostUserId;

        return (
            <div>
                <div className="status">{status}</div>
                <h1 key='p1'>{this.state.newPostTitle}</h1>
                <div className="postContent">{this.state.newPostBody}</div>
            </div >
        );
    }

    postNewNote() {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.state.newPostTitle,
                    body: this.state.newPostBody,
                    userId: this.state.newPostUserId
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
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
    

    getId(i) {
        
        return (
            <div>
                <div className="apop"><div className="apopbg"></div>
                    <div className="apopcontent">
                        <input type="text" placeholder="Enter post ID" onChange={this.setId} value={this.state.myId}  />
                        {(i === 'new') ?
                            <button onClick={this._onSubClick}>Submit</button>
                        :
                        (i === 'del') ?
                        <button onClick={this._onDelClick}>Delete</button>
                        : <button onClick={this._onEditIdClick}>Submit</button>
                        }
                    </div>    
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

                        {this.state.showFill ?
                            <div className="result wrong">Please fill all fields to submit a note</div> :
                            null
                        }
                        {this.state.showOk ?
                            <div className="result correct">New note was successfully created</div> :
                            null
                        }
                        <button onClick={this._onSendPostClick}>Submit</button></div>
                </div>
            </div >
        );
    }

    _onAllClick() {
        this.setState({
            showAll: true,
            showDel: false,
            showSub: false,
            showSmashed: false,
        });
    }

    _onPopClick() {
        this.setState({
            showAll: false,
            showDel: false,
            showSub: false,
            showSmashed: false,
            showPop: true,
            myId: ''
        });
    }

    _onPopDelClick() {
        this.setState({
            showAll: false,
            showPop: false,
            showSub: false,
            showSmashed: false,
            showDel: true,
            myId: ''
        });
    }

    _onPopEditClick() {
        this.setState({
            showAll: false,
            showPop: false,
            showSub: false,
            showSmashed: false,
            showDel: false,
            showEdit: true,
            myId: '',
            newPostTitle: '',
            newPostBody: '',
            newPostUserId: '',
            showFill: false,
            showOk: false
        });
    }


    _onSubClick() {
        this.setState({
            showAll: false,
            showPop: false,
            showDel: false,
            showSmashed: false,
            showSub: true,
        });
    }

    _onDelClick() {
        this.setState({
            showDel: false,
            showSmashed: true,
        });
    }

    _onEditIdClick() {
        this.setState({
            showEdit: false,
            showEditBoard: true,
            showChange: false,
            newPostTitle: '',
            newPostBody: '',
            newPostUserId: '',
            looper: true
        });
    }

    _onPostPopClick() {
        this.setState({
            newPostTitle: '',
            newPostBody: '',
            newPostUserId: '',
            showAll: false,
            showSub: false,
            showPostPop: true,
            showFill: false,
            showOk: false
        });
    }

    _onSendPostClick() {
        if ((this.state.newPostTitle.length !== 0) && (this.state.newPostBody.length !== 0) && (this.state.newPostUserId.length !== 0)) {
            this.setState({
                showFill: false,
                showOk: true,
                showNewPost: true,
                
            });
            setTimeout(
                function () {
                    this.setState({
                        showPostPop: false,
                        showSmashed: false,
                        showPreview: true
                    });
                }
                    .bind(this),
                3000
            );
        } else {
            this.setState({
                showOk: false,
            showFill: true
        });
        }
    }

    _onEditPostClick() {
        if ((this.state.newPostTitle.length !== 0) && (this.state.newPostBody.length !== 0) && (this.state.newPostUserId.length !== 0)) {
            this.setState({
                showFill: false,
                showOk: true,
                showChange: false

            });
            setTimeout(
                function () {
                    this.setState({
                        showEdit: false,
                        showEditBoard: false,
                        showChange: true
                    });
                }
                    .bind(this),
                3000
            );
        } else {
            this.setState({
                showOk: false,
                showFill: true
            });
        }
    }

    render() {

        return (
                <div>
                    <div className="blog-menu">
                    <div className="menu">
                        <ul>
                            <li className="menu-item" onClick={this._onAllClick}>Get all notes</li>
                            <li className="menu-item" onClick={this._onPopClick}>Get note by ID</li>
                            <li className="menu-item" onClick={this._onPostPopClick}>Post note</li>
                            <li className="menu-item" onClick={this._onPopEditClick}>Edit note by ID</li>
                            <li className="menu-item" onClick={this._onPopDelClick}>Delete note by ID</li>
                        </ul>
                        </div>
                    </div>
                <div className="blog-list">
                    {this.state.showAll ?
                        this.renderAllNotes() :
                        null
                    }
                    {this.state.showPop ?
                        this.getId('new') :
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
                    {this.state.showPreview ?
                        this.renderNewPreview(this.state) :
                        null
                    }
                    {this.state.showDel ?
                        this.getId('del') :
                        null
                    }
                    {this.state.showEdit ?
                        this.getId('edit') :
                        null
                    }
                    {this.state.showChange ?
                        this.renderChanged(this.state.myId) :
                        null
                    }
                    {this.state.showSmashed ?
                        this.renderSmashedPost(this.state.myId) :
                        null
                    }
                    {this.state.showEditBoard ?
                        this.renderPostForEdit(this.state.myId) :
                        null
                    }

                </div>
            </div >
    );
    }
}


// ========================================

ReactDOM.render((
        <List />
  ), document.getElementById('root')
);








