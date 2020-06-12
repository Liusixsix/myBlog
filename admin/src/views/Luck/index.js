import React, { Component } from 'react';
import './index.less'

const list = ['坦克', '飞机', '小黄书', '粑粑', '猫屎咖啡', '复读机', '备胎', '工具人', '奥利给', '战斗机']

function Loading() {
    return (
        <div className="loading">
            <div className='spinner'></div>
            <div class="spinner2">
                <div class="dot1"></div>
                <div class="dot2"></div>
            </div>
            <div class="spinner3">
                <div class="dot1"></div>
                <div class="dot2"></div>
                <div class="dot3"></div>
            </div>
        </div>
    )
}


class Luck extends Component {

    state = {
        flag: false,//是否旋转中 
        deg: 0,
        index: 5,//奖品下标
        MathNum: null
    }

    draw = () => {
        const canvas = document.querySelector('#canvas')
        var num = 10;
        var html = [];
        var ctx = canvas.getContext('2d')
        let rotateDeg = 360 / num / 2 + 90;
        for (let i = 0; i < num; i++) {
            // 保存当前状态
            ctx.save();
            // 开始一条新路径
            ctx.beginPath();
            // 位移到圆心，下面需要围绕圆心旋转
            ctx.translate(150, 150);
            // 从(0, 0)坐标开始定义一条新的子路径
            ctx.moveTo(0, 0);
            // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
            ctx.rotate((360 / num * i - rotateDeg) * Math.PI / 180);
            // 绘制圆弧
            ctx.arc(0, 0, 150, 0, 2 * Math.PI / num, false);
            // 颜色间隔
            if (i % 2 == 0) {
                ctx.fillStyle = '#ffb820';
            } else {
                ctx.fillStyle = '#ffcb3f';
            }
            // 填充扇形
            ctx.fill();
            // 绘制边框
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = '#e4370e';
            ctx.stroke();
            ctx.font = "16px Georgia";
            ctx.fillStyle = '#0000ff';
            // ctx.fillText(list[i],-ctx.measureText(list[i]).width /2,0);
            ctx.fillText(list[i], 100, 40)
            // 恢复前一个状态
            ctx.restore();
        }
    }
    start = (e) => {
        let MathNum = Math.floor(Math.random() * 9 + 0)
        console.log(MathNum)
        e.preventDefault()
        this.setState((prev, props) => ({
            flag: true,
            deg: prev.deg + (360 - prev.deg % 360) + (360 * 10 - MathNum * (360 / 10)),
            MathNum: MathNum
        }))

    }
    componentDidMount() {
        this.draw()
        let dom = document.querySelector('.luck-wrap')

        dom.addEventListener("transitionend", () => {
            console.log("动画结束");
            this.setState({
                flag: false,
            })
        })
    }

    render() {
        const { deg, flag, MathNum } = this.state
        return (
            <div>

                <div className='card-wrap'>
                    <div>{list[MathNum]}</div>
                    <div className='turntable'>
                        <div
                            className='luck-wrap'
                            style={{ transform: `rotate(${deg}deg)` }}
                        >
                            <canvas id="canvas" width="300" height="300">抱歉！浏览器不支持。</canvas>
                        </div>
                        <a className={['btn', flag ? 'disabled' : ''].join(' ')} onClick={this.start} href=""></a>
                    </div>
                </div>

                <Loading></Loading>
            </div>

        );
    }
}

export default Luck;