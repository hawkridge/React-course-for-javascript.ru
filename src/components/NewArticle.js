import linkedState from 'react-addons-linked-state-mixin'
import { addArticle } from '../AC/articles'
import React from 'react'
import { connect } from 'react-redux'

const NewArticle = React.createClass({
    mixins: [linkedState],
    getInitialState() {
        return {
            title: '',
            text: ''
        }
    },
    render: function() {
        return (
            <div>
                <input valueLink = {this.linkState("title")}/>
                <textarea valueLink = {this.linkState('text')} type = "text"/>
                <a href = "#" onClick = {this.addArticle}>Add new Article</a>
            </div>

        )
    },
    addArticle(ev) {
        ev.preventDefault()
        this.props.addArticle(this.state)
    }
});

export default connect(() => {return {}}, {
    addArticle
})(NewArticle)