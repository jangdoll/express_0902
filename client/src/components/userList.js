import React from 'react';
import axios from 'axios';

class UserList extends React.Component{
    constructor(props){
        super(props);
        console.log("constructor: ", this);
        this.state = {
            isLoaded: false,
            userData: []
        };
    }

    async getUserAll(){
        const result = await axios.get("http://localhost:5000/users");
        console.log(result);
        this.setState({
            isLoaded : true,
            userData : result.data
        })
    }

    componentDidMount(){
        console.log("componentDidMount: ", this);
        this.interval = setInterval(()=> {
            this.getUserAll();
        }, 1000);
    }

    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval);
        }
    }
    
    render(){
        const { isLoaded, userData } = this.state;

        return isLoaded ?
        <ul>
            {userData.map((data, i) =>{
                console.log(data);
                return <li key={i}>이름: {data.name}, {data.content}{data.board && ` 그룹명: ${data.board.content}`}</li>
            })}
        </ul>
        :
        <div>로딩중</div>
    }
}

export default UserList;