import React, {Component} from 'react';

class ControllerUnit extends Component {
  handleClick(e){
    //如果点击的是当前正在选中的按钮，则翻转图片，否则将对应图片居中
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }
  render() {
    let controllerUnitClassName="controller-unit";
    //如果是剧中的图片，显示控制按钮的居中态
    if (this.props.arrange.isCenter){
      controllerUnitClassName += " is-center";
      //如果同时图片对应的翻转态，显示控制按钮的翻转态
      if(this.props.arrange.isInverse){
        controllerUnitClassName += " is-inverse";
      }
    }
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick.bind(this)}></span>
    );
  }
}

export default ControllerUnit;