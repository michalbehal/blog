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
            myId: 1
            }
        this.renderAllNotes = this.renderAllNotes.bind(this);
        this.getId = this.getId.bind(this);
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
                <ul class="posts">
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
        const status = 'One note';

        return (
            <div>
                <div className="status">{status} - {i}</div>
                <ul class="posts">
                    <li key={singlePost.id}>
                            <a href={singlePost.title}>{singlePost.title}</a>
                            </li>
                </ul>
            </div >
        );
    }

    onChange(field, value) {
        this.setState({ myId: value });
    }
    

    getId() {
        return (
            <div>
                <div className="apop"><div className="apopbg"></div>
                    <div className="apopcontent">
                        <input type="text" placeholder="Enter post ID" onChange={this.onChange.bind(this)} />
                        <input type="submit" value="Submit" onClick={this.renderOneNote(this.state.myId)} /></div>
                </div>
            </div >
        );
    }

    render() {

        return (
                <div>
                    <div className="blog-menu">
                    <div className="menu">
                        <ul>
                            <li className="menu-item" onClick={this.renderAllNotes}>Get all notes</li>
                            <li className="menu-item" onClick={this.getId}>Get note by ID</li>
                            <li className="menu-item">Post notes</li>
                            <li className="menu-item">Put note by ID</li>
                            <li className="menu-item">Delete note by ID</li>
                        </ul>
                        </div>
                    </div>
                <div className="blog-list">
                </div>
            </div >
    );
    }
}
class Blog extends React.Component {
    render() {
        return (
            <div className="blog">
                <div className="blog-body">
                    <List />
                </div>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
  <Blog />,
  document.getElementById('root')
);






