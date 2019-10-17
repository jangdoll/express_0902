import React from 'react';
import axios from 'axios';

class UserList extends React.Component{
    constructor(props){
        super(props);
        console.log("constructor: ", this);
        this.interval = null;
        this.state = {
            isLoaded: false,
            editable: false,
            userData: [],
            progressing:false
        };
    }

    changeEditable(flag){
        const {editable} = this.state;
        if(editable){
            this.setState({
                editable : false
            })
        }else {
            this.setState({
                editable: true
            })
        }
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

    async clickAddBtn(){
        console.log();
        const {name, address} = this.refs;
        await axios.post('http://localhost:5000/users', {
                name: name.value,
                address: address.value
            });
        await this.getUserAll();
        this.setState({
            editable: false
        })
    }

    render(){
        const { isLoaded, userData, progressing, editable } = this.state;

        return isLoaded ?
        <div>
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
        <div onClick={this.changeEditable.bind(this)}>
            {editable ? "숨기기" : "+"}
        </div>
        {
            editable && <div>
                <input type="text" ref="name" placeholder="이름"></input>
                <input type="text" ref="address" placeholder="주소"></input>
                <span onClick={this.clickAddBtn.bind(this)} style={{fontsize: "0.6em"}}>추가하기</span>
            </div>
        }
        </div>
        :
        <div>로딩중</div>
    }
}


export default UserList;