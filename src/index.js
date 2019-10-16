import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';



class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                hits: null
            }
    }

    componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

    render() {
        const { hits } = this.state;
        return (
            <ul>
                {hits.map(hit =>
                    <li key={hit.objectID}>
                        <a href={hit.url}>{hit.title}</a>
                    </li>
                )}
            </ul>
        );
    } 
}

class List extends React.Component {

  renderNote(i) {
      return <Note value={this.props.value} />;
    }

    render() {
        const status = 'All notes';

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
  <Note />,
  document.getElementById('root')
);


