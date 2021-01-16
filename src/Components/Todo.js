import React, { Component } from 'react';
import './ToDo-styles/main.css';
import deleteImg from '../img/delete-icon.png';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: window.localStorage.getItem('list') ? JSON.parse(window.localStorage.getItem('list')) : [],
            inputValues: {},
            input:''
        };
    }

    inputChange = (e) => {
        this.setState(state => ({
            input:e.target.value,
            // setting id, val % is the item completed or not
            inputValues: {
                id: state.list.length,
                textVal: e.target.value,
                checked: false
            }
        }))
    }

    formSubmit = (e) => {
        e.preventDefault();
        if (this.state.input[0] === ' ') {
            alert('The first character of the input field cannot be a space!');
            return;
        }
        if(this.state.input === ''){
            alert('You cannot add an empty field!');
            return;
        }

        this.setState(state => ({
            list: [...state.list, state.inputValues],
            inputValues: {},
            input:''
        }))
    }

    deleteItem = (item) => {
        this.setState(state => ({
            list: state.list.filter((el) => el.id !== item)
        }))
        window.localStorage.removeItem('list')
    }

    checkedItem = (e) => {
        this.state.list.map((el) => {
            if(el.id === e){
                el.checked = !el.checked;
            }
            return el;
        })
        this.setState(state => ({
            list: [...state.list]
        }))
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.formSubmit} >
                    <input id="input" onChange={this.inputChange} value={this.state.input} />
                    <button type="submit">Add Item</button>
                </form>
                <ul>
                    {this.state.list.map((el) => {
                        //storage - sending items from "list" in local storage
                        const list = [...this.state.list];
                        window.localStorage.setItem('list', JSON.stringify(list));

                        if(el.checked){
                            return (
                                <>
                                    <li className="item-checked" key={el.id} onClick={() => this.checkedItem(el.id) } >
                                        {el.textVal}
                                        <span className="delete-btn" onClick={ () => this.deleteItem(el.id)} >
                                            {/*empty tags for vertical centering "delete btn"*/}
                                            <b></b> <img className="delete-img" src={deleteImg} alt="Delete item"/> <b></b>
                                        </span>
                                    </li> <hr />
                                </>
                            )
                        } else{
                            return (
                                <>
                                    <li className="item-todo" key={el.id} onClick={() => this.checkedItem(el.id) } >
                                        {el.textVal}
                                        <span className="delete-btn" onClick={ () => this.deleteItem(el.id)} >
                                            <b></b> <img className="delete-img" src={deleteImg} alt="Delete item"/> <b></b>
                                        </span>
                                    </li> <hr />
                                </>
                            )
                        }
                    })}

                </ul>
            </div>
        )
    }
}