import React from 'react';


class Button extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const {changeCount, label} = this.props;
        console.log(changeCount, label)
        return <button onClick={changeCount}>{label}</button>
    }
}

export default Button;