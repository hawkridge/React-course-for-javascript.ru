import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleListWithHOC'
import linkedState from 'react-addons-linked-state-mixin'
import { articles, comments } from '../stores'
import { addArticle } from '../actions/articleActions'

const Container = React.createClass({
    mixins: [linkedState],

    getInitialState: function() {
        return {
            newTitle: '',
            articles: articles.getAll()
        };
    },

    componentDidMount() {
        articles.addListener(this.articlesChange)
        comments.addListener(this.articlesChange)
    },

    componentWillUnmount() {
        articles.removeListener(this.articlesChange)
        comments.removeListener(this.articlesChange)
    },

    render() {
        return (
            <div>
                <input valueLink = {this.linkState("newTitle")}/>
                <a href = "#" onClick = {this.addArticle}>Add new Article</a>
                <ArticleList articles = {this.state.articles} />
            </div>
        )
    },

    articlesChange() {
        this.setState({
            articles: articles.getAll()
        })
    },

    addArticle(ev) {
        ev.preventDefault()
        addArticle({
            title: this.state.newTitle
        })
    }
})

/*
class Container extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    constructor() {
        super()
        this.state = {
            newTitle: ''
        }
    }

    render() {
        return (
            <div>
                <input value = {this.state.newTitle} onChange = {this.handleChange}/>
                <ArticleList articles = {this.props.articles} />
            </div>
        )
    }

    handleChange = (ev) => {
        this.setState({
            newTitle: ev.target.value
        })
    }
}
*/

export default Container
