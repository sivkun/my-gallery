require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取相关图片数据
let imagesDatas= require('../data/imageData.json');
//在数据中加入图片URL路径信息
imagesDatas=imagesDatas.map(value=>{
  value.imageURL=require('../images/'+value.fileName);
  return value;
})
console.log(imagesDatas);
class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
