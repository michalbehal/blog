import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';



class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "userName": "Author",
            "id": 1,
            "date": "16. 10. 2019",
            "title": "Test 1",
            "url": "/test-1"
        };
    }

    render() {
        return (
            <div className="simple-post">
                <div class="post-id col-1">{this.state.id}</div>
                <div class="post-date col-2">{this.state.date}</div>
                <div class="post-title col-7"><a href={this.state.url}>{this.state.title}</a></div>
                <div class="post-author col-2">by {this.state.userName}</div>
            </div>
        );
    }  
}

class List extends React.Component {

  renderNote(i) {
      return <Note value={this.props.value} />;
    }

    render() {
        const status = 'Choose option';

        return (
            <div>
                <div className="status">{status}</div>
            <div className="blog-list">
                {this.renderNote(0)}
                    {this.renderNote(1)}
                    {this.renderNote(2)}
            </div>
            </div >
    );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <li className="menu-item" onClick={() => this.setState({ value: 'clicked' })}>
                {this.props.value}
            </li>
        );
    }
}

class Menu extends React.Component {

    renderItem(i) {
        return <Item value={i} />;
    }

    render() {
        return (
            <div>
                <div className="menu">
                    <ul>
                        {this.renderItem('Get all notes')}
                        {this.renderItem('Get note by ID')}
                        {this.renderItem('Post notes')}
                        {this.renderItem('Put note by ID')}
                        {this.renderItem('Delete note by ID')}
                        </ul>
                </div>
            </div >
        );
    }
}

class Blog extends React.Component {
    render() {
        return (
            <div className="blog">
                <div className="blog-menu">
                    <Menu />
                </div>
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


