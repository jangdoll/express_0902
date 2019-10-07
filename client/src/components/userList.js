import React from 'react';
import axios from 'axios';

class UserList extends React.Component{
    constructor(props){
        super(props);
        console.log("constructor: ", this);
        this.state = {
            isLoaded: false,
            userData: [],
            progressing:false
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
    async clickDeleteBtn(id, name){
        this.setState({
            progressing: true
        });
        alert(`id: ${id}, 이름: ${name}을 삭제합니다.`);
        await axios.delete(`http://localhost:5000/users/${id}`);
        await this.getUserAll();
        this.setState({
            progressing: false
        });
    }

    render(){
        const { isLoaded, userData, progressing } = this.state;

        return isLoaded ?
        <ul>
            {
            progressing 
            &&
            <div className="loadmask">
                <img src="/img/loading.gif"></img>
            </div>
            }
            
            {userData.map((data, i) =>{
                console.log(data);
                return <li key={i}>id: {data.id}{data.content}{` 이름: ${data.name}`}
                <span onClick ={this.clickDeleteBtn.bind(this, data.id, data.name)}>
                X
                </span>
                </li>
            })}
        </ul>
        :
        <div>로딩중</div>
    }
}


export default UserList;