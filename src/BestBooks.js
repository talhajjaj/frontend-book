import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import BookFormModal from 'BookFormModal';
import { Button } from 'bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email: '',
      bookData: [],
      showBook: false,
      showModal: false,
      showUpdateModal:false,
      index:0,
      bookName:"",
      bookDescription:""
      

    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0
    await this.setState({
      email: `${user.email}`

    })
    let url = `http://localhost:3001/books?userEmail=${this.state.email}`
    let responsData = await axios.get(url);
    await this.setState({
      showBook: true,
      bookData: responsData.data,
    })
  }
renderForm =async() =>{
  await this.setState({
    showModal:true
  })
}
handleClose= async () =>{
  await this.setState({
    showModal:false,
    showUpdateModal:false,
  })
}
 handleForm = async (event)=>{
   event.preventDefault();
   await this.setState({
     showModal:false
   })
   const newBookobj={
     email: this.state.userEmail,
     name: event.target.name.value,
     description:event.target.description.value,
     img: event.target.img.value,
   }
   let url=`${process.env.REACT_APP_BOOK}/addbook`
   let responseBook= await axios.post(url,newBookobj);
 
   await this.setState({
     renderBook:responseBook.data
   })
 }

 deleteBook = async(index) =>{


  let paramsObj = {
    email:this.state.userEmail,
  }
  let url =`${process.env.REACT_APP_BOOK}/deletebook/${index}`;

  let deletBookrespons = await axios.delete(url,{params:paramsObj});
  
  this.setState({
    renderBook:deletBookrespons.data
  })


}

showupdateBook=async(index)=>{
 await this.setState({
  showUpdateModal: true ,
  index: index,
  bookName:this.state.bookData[index].name,
  bookDescription:this.state.bookData[index].description

})
}

updateBook= async (event) =>{
  event.preventDefault();
  let newBookobj = {
    email: this.state.userEmail,
    name: event.target.name.value,
    description:event.target.description.value,
    img: event.target.img.value,
  }
  let url =`${process.env.REACT_APP_BOOK}/updateBook/${index}`;

  let dataBook = await axios.put(url,newBookobj);
await this.setState({
    bookData:dataBook.data
  })
}

  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.bookData.map(book => {
          return (<BookCard showBook={this.state.showBook} renderBook={book} />)
        })}
                <Button  onClick={this.renderForm} >ADD BOOK</Button>
                <Button  onClick={()=>this.props.showupdateBook} >Update</Button>
             

                <ModalForm handleClose={this.handleClose} showModal={this.state.showModal} handelForm={this.handelForm}  />
                <UpdateBook updateBook={this.updateBook} showModal={this.state.showUpdateModal} handleClose={this.handleClose} />
      </Jumbotron>
      
    )
  }
}

export default withAuth0(MyFavoriteBooks);
