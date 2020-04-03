import React, { Component, useState, useEffect, } from 'react';


function HookTest() {
    const [count, setCount] = useState(0)

    // 每次count改变执行
    useEffect(() => {
        // console.log('useffect')
    }, [count])

    useEffect(() => {
        // console.log('调用')
    }, [])

    const [age] = useState(16)

    return (
        <div>
            点击了{count} --{age}
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    )
}



function Kaikeba(props) {
    // console.log({ ...props })
    return <div>{props.stage}-{props.name}</div>
}


const withKaikeba = Comp => {
    const name = '高级组件';
    // return props => <Comp {...props} name={name}></Comp>;
    return class extends Component {
        componentDidMount() {
            // console.log('do something')
        }
        render() {
            return <Comp {...this.props} name={name}></Comp>
        }
    }
}

const withLog = Comp => {
    // console.log(Comp.name + "渲染了")
    return props => <Comp {...props}></Comp>
}


const NewKaikeba = withKaikeba(withLog(Kaikeba))

class Hoc extends Component {
    render() {
        return (
            <div>
                <NewKaikeba stage='React' ></NewKaikeba>
                <HookTest></HookTest>
            </div>
        );
    }
}

export default Hoc;