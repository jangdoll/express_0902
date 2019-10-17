import React from 'react';
import Button from './button';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }
    
    changeCount(flag){
        console.log(flag);
        const {count} = this.state;
        if(flag === "add"){
            this.setState({
                count: count+1
            });
        }else{
            this.setState({
                count: count-1
            });
        }
    }

    render(){
        const {count} = this.state;

        return <div>
            <div>{count}</div>
            <Button 
            changeCount={this.changeCount.bind(this, 'add')} 
            label="더하기"/>
            <Button 
            changeCount={this.changeCount.bind(this, 'minus')} 
            label="빼기"/>
        </div>
    }
}

export default Test;