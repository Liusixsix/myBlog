import React, { Component, useContext } from 'react';

const Mycontext = React.createContext();
const { Provider, Consumer } = Mycontext;

function Child(props) {
    return (
        <div>Child:{props.foo}</div>
    )
}
function Child2() {
    const ctx = useContext(Mycontext)
    return (
        <div>Child2:{ctx.foo}</div>
    )
}

class Child3 extends Component {
    static contextType = Mycontext;
    render() {
        return <div>Child3:{this.context.foo}</div>
    }
}

class contextText extends Component {
    render() {
        return (
            <div>
                <Provider value={{ foo: 'bar' }}>
                    {/* 消费者：consumer */}
                    <Consumer>
                        {value => <Child {...value}></Child>}
                    </Consumer>
                    {/* hook */}
                    <Child2></Child2>
                    <Child3></Child3>
                </Provider>
            </div>
        );
    }
}

export default contextText;