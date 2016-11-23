require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';
//获取相关图片数据
var imageDatas= require('../data/imageData.json');
//在数据中加入图片URL路径信息
imageDatas=imageDatas.map(value=>{
  value.imageURL=require('../images/'+value.fileName);
  return value;
});
/**获取区间内的一个随机数 */
function getRangeRandom(low,high){
  return Math.floor(Math.random()*(high-low)+low);
}
/**
获取0~30°之间的
 */
function get30DegRandom(){
  return ((Math.random()>0.5?'':'-') + Math.floor(Math.random()*30));
}
//console.log(imagesDatas);
class AppComponent extends React.Component {
   constructor(){
    super();
    this.state={
     imgsArrangeArr:[
       // {
        //   pos:{
        //     left: '0',
        //     top: '0'
        //   },
        //  rotate:0,
        //  isInverse:false , //图片正反面
        //  isCenter: false //图片是否居中
        // }
     ]
    };
    this.Constant={
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{ //水平方向的取值范围
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{//垂直方向的取值范围
      x:[0,0],
      topY:[0,0],
    }
  };
  }

  /**
  *翻转图片
  *@param index 输入当前被执行的inverse操作的图片对应的图片信息数组的index值
  *@return {Function} 闭包函数，其内return一个真正被执行的函数
   */
   inverse(index){
     return function(){
       var imgsArrangeArr=this.state.imgsArrangeArr;
       imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;
       this.setState({
         imgsArrangeArr:imgsArrangeArr
       });
     }.bind(this);
   }
  
  /*
  *重新布局所有图片 
  *@param centerIndex 居中哪个图片
  */
  rearrange(centerIndex){
    var imgsArrangeArr=this.state.imgsArrangeArr,
        Constant=this.Constant,
        centerPos=Constant.centerPos,
        hPosRange=Constant.hPosRange,
        vPosRange=Constant.vPosRange,
        hPosRangeLeftSecX=hPosRange.leftSecX,
        hPosRangeRightsecX=hPosRange.rightSecX,
        hPosRangeY=hPosRange.y,
        vPosRangeTopY=vPosRange.topY,
        vPosRangeX=vPosRange.x,

        imgsArrangeTopArr=[],
        topImgNum=Math.floor(Math.random()*2),//去一个或不取
        
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        console.log(topImgNum);
        ///首先居中centerIndex的图片 //居中的centerIndex图片不需要旋转
        imgsArrangeCenterArr[0]={
          pos:centerPos,
          rotate:0,
          isCenter: true
        }
       
        

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex=Math.floor(Math.random()*(imgsArrangeArr.length-topImgNum));
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach((value,index)=>{
          imgsArrangeTopArr[index]={
            pos:{
              top:getRangeRandom( vPosRangeTopY[0] ,vPosRangeTopY[1]),
              left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate:get30DegRandom(),
            isCenter: false
           }
        });
        console.log(imgsArrangeTopArr);

        //布局左右两侧的图片
        for(let i = 0,j = imgsArrangeArr.length, k = j / 2; i < j; i++){
          var hPosRangeLORX=null;

          //前半部分布局左边，后半部分布局右边
          if ( i < k ){
            hPosRangeLORX=hPosRangeLeftSecX;
          }else{
            hPosRangeLORX=hPosRangeRightsecX;
          }
          imgsArrangeArr[i]={
            pos : {
             top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
             left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false
          };
        }
       // debugger;
        if(imgsArrangeTopArr&&imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
            console.log(topImgSpliceIndex);
          }
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
         this.setState({
            imgsArrangeArr:imgsArrangeArr
          });
  }

 
  //组件加载后，为每张图片计算其位置的范围
  componentDidMount(){
    //首先拿到舞台的大小
    var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
        stageW=stageDOM.scrollWidth,
        stageH=stageDOM.scrollHeight,
        halfStageW=Math.floor(stageW / 2),
        halfStageH=Math.floor(stageH / 2);
     //    console.log(stageW);
      //拿到一个imageFigure的大小
      var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.floor(imgW / 2),
          halfImgH = Math.floor(imgH / 2);

      //计算中心点位置
      this.Constant.centerPos={
        left:halfStageW - halfImgW,
        top: halfStageH - halfImgH
      };
    //  console.log(halfStageW+""+halfImgW);
     // console.log(this.Constant.centerPos);

      this.Constant.hPosRange.leftSecX[0]=-halfImgW;
      this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW * 3;
      this.Constant.hPosRange.rightSecX[0]=halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
      this.Constant.hPosRange.y[0]= -halfImgH;
      this.Constant.hPosRange.y[1]=stageH-halfImgH;

      this.Constant.vPosRange.topY[0]= -halfImgH;
      this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
      this.Constant.vPosRange.x[0]=halfStageW-imgW;
      this.Constant.vPosRange.x[1]=halfStageW;
      let num =Math.floor(Math.random()*this.state.imgsArrangeArr.length);
      this.rearrange(num);
  }
  /**
  *利用rearrange函数，居中对应index的图片
  * @param index ，需要被居中的图片对应图片信息数组的index的值。
  * @return {Function}
   */
  center(index){
    return ()=>{
      this.rearrange(index);
    };
  }
  render() {
    var controllerUnits=[],
    ImgFigures=[];
    imageDatas.forEach((element,index)=> {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:0,
          isInverse:false,
          isCenter: false
        }
      }
      ImgFigures.push(<ImgFigure key={index} data={element} id={'imgFigure'+index} ref={'imgFigure'+index}
      arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
      center={this.center(index)}/>);

      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
      inverse={this.inverse(index)} center={this.center(index)}/>)
    });

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {ImgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
