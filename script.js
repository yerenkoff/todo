const root = ReactDOM.createRoot(
    document.getElementById('root')
);
console.log(root);
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [

            ],
            text: '',
            itemToFix: 0,
            fixedText: '',
            modalClassList: 'modal',
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let newItem = {
            text: this.state.text,
            id: Date.now(),
        }
        this.setState(function (state) {
            let newItems = state.items;
            newItems.push(newItem);
            return {
                items: newItems,
                text: '',
            }
        }, function () {
            console.log(this.state.items);
        });
    }

    handleDelete(id) {
        console.log(id);
        this.setState(function (state) {
            let newItems = state.items;
            newItems.splice(id, 1);
            return {
                items: newItems,
            }
        })
    }

    handleClearAll() {
        this.setState({
            items: [],
        })
    }

    handleCheck(e) {
        // console.log(e.target.classList);
        if (e.target.classList.contains("checkedItem")) {
            e.target.classList.remove("checkedItem");
        } else {
            e.target.classList.add("checkedItem");
        }
    }

    handleEdit(id) {

        this.setState({
            itemToFix: id,
            modalClassList: 'modal modalShow',
        })
    }

    handleFix(e) {
        e.preventDefault();
        this.setState(function (state) {
            let newItems = state.items;
            let item = newItems[state.itemToFix];
            item.text = state.fixedText;
            return {
                items: newItems,
                modalClassList: 'modal',
                fixedText: '',
            }
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.modalClassList} onClick={() => this.setState({ modalClassList: 'modal' })}>
                    <form action="" onSubmit={(e) => this.handleFix(e)} onClick={(e) => e.stopPropagation()}>
                        <h2>edit</h2>
                        <input type="text" onChange={(e) => this.setState({ fixedText: e.target.value })} value={this.state.fixedText} />
                        <button>🖊️</button>
                    </form>
                </div>
                <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>ToDo App</h1>

                    <ol>
                        {
                            this.state.items.map((item, id) => (
                                <li key={item.id}>
                                    <p onClick={(e) => this.handleCheck(e)}>{item.text}</p>
                                    <div className="actions">
                                        <button type="button" onClick={() => this.handleEdit(id)}>🖊️</button>
                                        <button type="button" onClick={() => this.handleDelete(id)}>🗑️</button>
                                    </div>
                                </li>
                            ))
                        }



                    </ol>

                    <input autoFocus type="text" onChange={(e) => this.setState({ text: e.target.value })} value={this.state.text} />
                    <button>📌</button>
                    <button type="button" onClick={() => this.handleClearAll()}>💣</button>
                </form>
            </div>

        )
    }

}

root.render(<App />);